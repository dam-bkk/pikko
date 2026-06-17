import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import type { Book, ReadingSession, VocabularyProgress } from './types';

const DB_PATH = path.join(process.cwd(), 'data', 'readdee.db');

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (_db) return _db;
  _db = new Database(DB_PATH);
  _db.pragma('journal_mode = WAL');
  initSchema(_db);
  return _db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      title_thai TEXT NOT NULL,
      title_english TEXT NOT NULL,
      level TEXT NOT NULL,
      theme TEXT,
      cover_image_path TEXT,
      data JSON NOT NULL
    );

    CREATE TABLE IF NOT EXISTS vocabulary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_id TEXT NOT NULL,
      thai TEXT NOT NULL,
      romanization TEXT NOT NULL,
      english TEXT NOT NULL,
      tone TEXT,
      level TEXT DEFAULT 'Level 1',
      UNIQUE(book_id, thai)
    );

    CREATE TABLE IF NOT EXISTS reading_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_id TEXT NOT NULL,
      started_at TEXT NOT NULL,
      finished_at TEXT,
      completed INTEGER DEFAULT 0,
      pages_read INTEGER DEFAULT 0,
      total_time_seconds INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS vocabulary_exposure (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vocabulary_id INTEGER NOT NULL,
      session_id INTEGER NOT NULL,
      exposure_count INTEGER DEFAULT 1,
      FOREIGN KEY (vocabulary_id) REFERENCES vocabulary(id),
      FOREIGN KEY (session_id) REFERENCES reading_sessions(id)
    );

    CREATE TABLE IF NOT EXISTS streaks (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      current_streak INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      last_active_date TEXT
    );

    CREATE TABLE IF NOT EXISTS favorites (
      book_id TEXT PRIMARY KEY
    );

    INSERT OR IGNORE INTO streaks (id, current_streak, longest_streak) VALUES (1, 0, 0);

    CREATE TABLE IF NOT EXISTS referrals (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      referrer_email TEXT NOT NULL,
      referred_name  TEXT NOT NULL DEFAULT '',
      referred_email TEXT NOT NULL DEFAULT '',
      status         TEXT NOT NULL DEFAULT 'pending',
      created_at     TEXT NOT NULL DEFAULT (datetime('now')),
      activated_at   TEXT
    );

    CREATE TABLE IF NOT EXISTS book_credits (
      parent_email TEXT PRIMARY KEY,
      credits      INTEGER NOT NULL DEFAULT 0,
      updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS story_submissions (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      parent_email   TEXT NOT NULL,
      story_title    TEXT NOT NULL,
      narrator_name  TEXT NOT NULL DEFAULT '',
      story_body     TEXT NOT NULL DEFAULT '',
      age_range      TEXT NOT NULL DEFAULT '4-6',
      status         TEXT NOT NULL DEFAULT 'pending',
      submitted_at   TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS child_profiles (
      parent_email TEXT PRIMARY KEY,
      child_name   TEXT NOT NULL DEFAULT '',
      child_avatar TEXT NOT NULL DEFAULT 'rabbit',
      xp           INTEGER NOT NULL DEFAULT 0,
      level        INTEGER NOT NULL DEFAULT 1,
      badges       TEXT NOT NULL DEFAULT '[]',
      updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

export function seedBooks(books: Book[]) {
  const db = getDb();
  const insertBook = db.prepare(`
    INSERT OR REPLACE INTO books (id, title_thai, title_english, level, theme, data)
    VALUES (@id, @title_thai, @title_english, @level, @theme, @data)
  `);
  const insertVocab = db.prepare(`
    INSERT OR IGNORE INTO vocabulary (book_id, thai, romanization, english, tone, level)
    VALUES (@book_id, @thai, @romanization, @english, @tone, @level)
  `);

  const seedAll = db.transaction(() => {
    for (const book of books) {
      insertBook.run({
        id: book.id,
        title_thai: book.title_thai,
        title_english: book.title_english,
        level: book.level,
        theme: book.theme,
        data: JSON.stringify(book),
      });
      for (const vocab of book.core_vocabulary) {
        insertVocab.run({
          book_id: book.id,
          thai: vocab.thai,
          romanization: vocab.romanization,
          english: vocab.english,
          tone: vocab.tone,
          level: book.level,
        });
      }
    }
  });
  seedAll();
}

export function getAllBooks(): Book[] {
  const db = getDb();
  const rows = db.prepare('SELECT data FROM books ORDER BY rowid').all() as { data: string }[];
  return rows.map((r) => JSON.parse(r.data) as Book);
}

export function getBookById(id: string): Book | null {
  const db = getDb();
  const row = db.prepare('SELECT data FROM books WHERE id = ?').get(id) as { data: string } | undefined;
  return row ? (JSON.parse(row.data) as Book) : null;
}

export function startSession(bookId: string): number {
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO reading_sessions (book_id, started_at, completed, pages_read, total_time_seconds)
    VALUES (?, datetime('now'), 0, 0, 0)
  `).run(bookId);
  return result.lastInsertRowid as number;
}

export function updateSession(sessionId: number, pagesRead: number, completed: boolean) {
  const db = getDb();
  db.prepare(`
    UPDATE reading_sessions
    SET pages_read = ?,
        completed = ?,
        finished_at = CASE WHEN ? = 1 THEN datetime('now') ELSE finished_at END,
        total_time_seconds = CAST((julianday('now') - julianday(started_at)) * 86400 AS INTEGER)
    WHERE id = ?
  `).run(pagesRead, completed ? 1 : 0, completed ? 1 : 0, sessionId);

  if (completed) {
    updateStreak();
  }
}

export function recordVocabExposure(sessionId: number, bookId: string, thaiWords: string[]) {
  const db = getDb();
  const getVocab = db.prepare('SELECT id FROM vocabulary WHERE book_id = ? AND thai = ?');
  const insertExposure = db.prepare(`
    INSERT INTO vocabulary_exposure (vocabulary_id, session_id, exposure_count)
    VALUES (?, ?, 1)
    ON CONFLICT DO UPDATE SET exposure_count = exposure_count + 1
  `);
  const record = db.transaction(() => {
    for (const thai of thaiWords) {
      const vocab = getVocab.get(bookId, thai) as { id: number } | undefined;
      if (vocab) insertExposure.run(vocab.id, sessionId);
    }
  });
  record();
}

function updateStreak() {
  const db = getDb();
  const today = new Date().toISOString().split('T')[0];
  const streak = db.prepare('SELECT * FROM streaks WHERE id = 1').get() as {
    current_streak: number;
    longest_streak: number;
    last_active_date: string | null;
  };

  let newStreak = 1;
  if (streak.last_active_date) {
    const last = new Date(streak.last_active_date);
    const now = new Date(today);
    const diff = Math.floor((now.getTime() - last.getTime()) / 86400000);
    if (diff === 0) return; // already logged today
    if (diff === 1) newStreak = streak.current_streak + 1;
  }

  const longest = Math.max(newStreak, streak.longest_streak);
  db.prepare(`
    UPDATE streaks SET current_streak = ?, longest_streak = ?, last_active_date = ? WHERE id = 1
  `).run(newStreak, longest, today);
}

export function getStreak() {
  const db = getDb();
  return db.prepare('SELECT * FROM streaks WHERE id = 1').get() as {
    current_streak: number;
    longest_streak: number;
    last_active_date: string | null;
  };
}

export function getWeeklyStats() {
  const db = getDb();
  const sessions = db.prepare(`
    SELECT * FROM reading_sessions
    WHERE started_at >= datetime('now', '-7 days')
    ORDER BY started_at DESC
  `).all() as ReadingSession[];
  return sessions;
}

export function getVocabularyProgress(): VocabularyProgress[] {
  const db = getDb();
  const rows = db.prepare(`
    SELECT v.thai, v.romanization, v.english, v.tone,
           COALESCE(SUM(ve.exposure_count), 0) as exposures
    FROM vocabulary v
    LEFT JOIN vocabulary_exposure ve ON ve.vocabulary_id = v.id
    GROUP BY v.id
    ORDER BY v.book_id, v.id
  `).all() as { thai: string; romanization: string; english: string; tone: string; exposures: number }[];

  return rows.map((r) => ({
    ...r,
    mastery: (r.exposures === 0 ? 0 : r.exposures < 3 ? 1 : r.exposures < 5 ? 2 : 3) as 0 | 1 | 2 | 3,
  }));
}

export function toggleFavorite(bookId: string): boolean {
  const db = getDb();
  const existing = db.prepare('SELECT book_id FROM favorites WHERE book_id = ?').get(bookId);
  if (existing) {
    db.prepare('DELETE FROM favorites WHERE book_id = ?').run(bookId);
    return false;
  } else {
    db.prepare('INSERT INTO favorites (book_id) VALUES (?)').run(bookId);
    return true;
  }
}

export function getFavorites(): string[] {
  const db = getDb();
  return (db.prepare('SELECT book_id FROM favorites').all() as { book_id: string }[]).map((r) => r.book_id);
}

/* ── Referrals ── */
export function createReferral(referrerEmail: string, referredName: string, referredEmail: string) {
  const db = getDb();
  db.prepare(`
    INSERT INTO referrals (referrer_email, referred_name, referred_email)
    VALUES (?, ?, ?)
  `).run(referrerEmail, referredName, referredEmail);
}

export function getReferrals(referrerEmail: string) {
  const db = getDb();
  return db.prepare('SELECT * FROM referrals WHERE referrer_email = ? ORDER BY created_at DESC').all(referrerEmail) as {
    id: number; referrer_email: string; referred_name: string; referred_email: string; status: string; created_at: string;
  }[];
}

export function getBookCredits(parentEmail: string): number {
  const db = getDb();
  const row = db.prepare('SELECT credits FROM book_credits WHERE parent_email = ?').get(parentEmail) as { credits: number } | undefined;
  return row?.credits ?? 0;
}

export function grantBookCredit(parentEmail: string) {
  const db = getDb();
  db.prepare(`
    INSERT INTO book_credits (parent_email, credits, updated_at)
    VALUES (?, 1, datetime('now'))
    ON CONFLICT(parent_email) DO UPDATE SET credits = credits + 1, updated_at = datetime('now')
  `).run(parentEmail);
}

export function useBookCredit(parentEmail: string): boolean {
  const db = getDb();
  const current = getBookCredits(parentEmail);
  if (current <= 0) return false;
  db.prepare(`UPDATE book_credits SET credits = credits - 1, updated_at = datetime('now') WHERE parent_email = ?`).run(parentEmail);
  return true;
}

/* ── Story submissions ── */
export interface StorySubmission {
  id: number;
  parent_email: string;
  story_title: string;
  narrator_name: string;
  story_body: string;
  age_range: string;
  status: string;
  submitted_at: string;
}

export function submitStory(parentEmail: string, title: string, narratorName: string, body: string, ageRange: string): StorySubmission {
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO story_submissions (parent_email, story_title, narrator_name, story_body, age_range)
    VALUES (?, ?, ?, ?, ?)
  `).run(parentEmail, title, narratorName, body, ageRange);
  return db.prepare('SELECT * FROM story_submissions WHERE id = ?').get(result.lastInsertRowid) as StorySubmission;
}

export function getStorySubmissions(parentEmail: string): StorySubmission[] {
  const db = getDb();
  return db.prepare('SELECT * FROM story_submissions WHERE parent_email = ? ORDER BY submitted_at DESC').all(parentEmail) as StorySubmission[];
}

export interface ChildProfile {
  parent_email: string;
  child_name: string;
  child_avatar: string;
  xp: number;
  level: number;
  badges: string[];
}

export function getChildProfile(parentEmail: string): ChildProfile | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM child_profiles WHERE parent_email = ?').get(parentEmail) as
    | (Omit<ChildProfile, 'badges'> & { badges: string }) | undefined;
  if (!row) return null;
  return { ...row, badges: JSON.parse(row.badges) };
}

export function upsertChildProfile(
  parentEmail: string,
  childName: string,
  childAvatar: string,
): ChildProfile {
  const db = getDb();
  db.prepare(`
    INSERT INTO child_profiles (parent_email, child_name, child_avatar, updated_at)
    VALUES (?, ?, ?, datetime('now'))
    ON CONFLICT(parent_email) DO UPDATE SET
      child_name   = excluded.child_name,
      child_avatar = excluded.child_avatar,
      updated_at   = excluded.updated_at
  `).run(parentEmail, childName, childAvatar);
  return getChildProfile(parentEmail)!;
}

export function addXp(parentEmail: string, amount: number): ChildProfile {
  const db = getDb();
  const existing = getChildProfile(parentEmail);
  if (!existing) {
    db.prepare(`INSERT OR IGNORE INTO child_profiles (parent_email, child_name) VALUES (?,'')`).run(parentEmail);
  }
  const newXp    = (existing?.xp ?? 0) + amount;
  const newLevel = Math.floor(newXp / 100) + 1;

  const currentBadges: string[] = existing?.badges ?? [];
  const totalBooks = (db.prepare(`SELECT COUNT(*) as c FROM reading_sessions WHERE completed = 1`).get() as { c: number }).c;
  const streak = (db.prepare('SELECT current_streak FROM streaks WHERE id = 1').get() as { current_streak: number })?.current_streak ?? 0;
  const wordsMastered = (db.prepare(`
    SELECT COUNT(*) as c FROM (
      SELECT v.id, COALESCE(SUM(ve.exposure_count),0) as exp
      FROM vocabulary v LEFT JOIN vocabulary_exposure ve ON ve.vocabulary_id = v.id
      GROUP BY v.id HAVING exp >= 5
    )
  `).get() as { c: number }).c;

  const earned: string[] = [];
  if (totalBooks >= 1  && !currentBadges.includes('first_story'))  earned.push('first_story');
  if (totalBooks >= 5  && !currentBadges.includes('explorer'))     earned.push('explorer');
  if (streak     >= 5  && !currentBadges.includes('reading_star')) earned.push('reading_star');
  if (wordsMastered >= 20 && !currentBadges.includes('word_wizard')) earned.push('word_wizard');

  const badges = JSON.stringify([...currentBadges, ...earned]);

  db.prepare(`
    UPDATE child_profiles SET xp = ?, level = ?, badges = ?, updated_at = datetime('now')
    WHERE parent_email = ?
  `).run(newXp, newLevel, badges, parentEmail);

  return getChildProfile(parentEmail)!;
}

export function ensureSeeded() {
  const db = getDb();
  const count = (db.prepare('SELECT COUNT(*) as c FROM books').get() as { c: number }).c;
  if (count === 0) {
    const booksPath = path.join(process.cwd(), 'data', 'books.json');
    if (fs.existsSync(booksPath)) {
      const books: Book[] = JSON.parse(fs.readFileSync(booksPath, 'utf-8'));
      seedBooks(books);
    }
  }
}
