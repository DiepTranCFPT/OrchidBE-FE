import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

export default function DetailOrchid() {
  const [orchid, setOrchid] = React.useState({});
  const params = useParams();
  const id = params.id;
  const baseUrl = import.meta.env.VITE_API_URL;

  React.useEffect(() => { fetchData(); }, [id]);
  const fetchData = () => {
    axios.get(`${baseUrl}/${id}`)
      .then(response => setOrchid(response.data))
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', padding: '32px 0', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 2, minWidth: 300 }}>
        <div style={{ fontWeight: 700, fontSize: 22, color: '#2d3a4a', marginBottom: 12 }}>{orchid.orchidName || 'Loading...'}</div>
        <div style={{ color: '#6b7684', marginBottom: 18 }}>{orchid.description || 'Loading...'}</div>
        <div style={{ marginBottom: 18 }}>
          <span style={{ background: orchid.isNatural ? '#43a047' : '#ffb300', color: '#fff', borderRadius: 5, padding: '4px 12px', fontSize: 14 }}>
            {orchid.isNatural ? 'Hoa lan tự nhiên' : 'Hoa lan công nghiệp'}
          </span>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={orchid.image}
          alt={orchid.orchidName || 'Loading...'}
          style={{ width: '100%', maxWidth: 220, borderRadius: 10, objectFit: 'cover', marginBottom: 12 }}
        />
      </div>
    </div>
  );
}