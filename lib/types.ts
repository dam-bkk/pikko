export interface KaraokeTimestamp {
  syllable: string;
  start_ms: number;
  end_ms: number;
}

export interface AudioSpecs {
  voice: string;
  speed: string;
  pause_after_each_syllable: boolean;
  format: string;
  karaoke_timestamps: KaraokeTimestamp[];
}

export interface VocabularyItem {
  thai: string;
  romanization: string;
  english: string;
  part_of_speech: string;
  tone: string;
}

export interface Page {
  page_number: number;
  thai_text: string;
  romanization: string;
  ipa: string;
  english_translation: string;
  syllable_breakdown: string;
  new_vocabulary: string[];
  repeated_pattern: string;
  image_prompt: string;
  audio_specs: AudioSpecs;
}

export interface CharacterSheet {
  character_name: string;
  physical_description: Record<string, string>;
  personality: string[];
  recurring_objects: string[];
  art_style_reference: string;
}

export interface IllustrationStyleBible {
  medium: string;
  palette: string;
  linework: string;
  composition: string;
  lighting: string;
  mood: string;
  forbidden: string;
}

export interface Book {
  id: string;
  title_thai: string;
  title_english: string;
  title_romanization: string;
  level: string;
  theme: string;
  core_vocabulary: VocabularyItem[];
  character_sheet: CharacterSheet;
  illustration_style_bible: IllustrationStyleBible;
  pages: Page[];
}

export interface ReadingSession {
  id: number;
  book_id: string;
  started_at: string;
  finished_at: string | null;
  completed: boolean;
  pages_read: number;
  total_time_seconds: number;
}

export interface VocabularyExposure {
  vocabulary_id: number;
  session_id: number;
  exposure_count: number;
}

export interface Streak {
  current_streak: number;
  longest_streak: number;
  last_active_date: string;
}

// 0=new, 1=seen, 2=familiar, 3=mastered
export type MasteryLevel = 0 | 1 | 2 | 3;

export interface VocabularyProgress {
  thai: string;
  romanization: string;
  english: string;
  tone: string;
  exposures: number;
  mastery: MasteryLevel;
}
