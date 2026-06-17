interface AuthorBioProps {
  name: string;
  location: string;
  bio: string;
  authorId: string;
}

export default function AuthorBio({ name, location, bio, authorId }: AuthorBioProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px 24px', background: '#F7F5FF', borderRadius: 16, marginTop: 32, borderLeft: '4px solid #7C2DFF' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#7C2DFF,#3BAFDA)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 22, fontWeight: 900, color: 'white' }}>
        {name.charAt(0)}
      </div>
      <div>
        <p style={{ fontWeight: 800, fontSize: 15, color: '#1A2B3C', marginBottom: 2 }}>{name}</p>
        <p style={{ fontSize: 12, color: '#9B74E8', fontWeight: 600, marginBottom: 6 }}>{location}</p>
        <p style={{ fontSize: 14, color: '#6B7A8D', lineHeight: 1.6 }}>{bio}</p>
      </div>
    </div>
  );
}
