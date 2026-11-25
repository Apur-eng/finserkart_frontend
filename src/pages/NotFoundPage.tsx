import { ActionButton, EmptyState } from '../components/ui';
import { Surface } from '../components/Surface';
import { FileQuestion } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Surface style={{ maxWidth: "40rem", margin: "clamp(1rem, 6.153846153846154vw, 5rem) auto", padding: "0 1.25rem", textAlign: 'center' }}>
      <EmptyState
        title="404 — Page Not Found"
        description="The page you requested does not exist or has been relocated in the new Finservkart platform."
        icon={<FileQuestion size={48} color="#687d93" />}
        actions={
          <ActionButton
            label="Return to Homepage"
            variant="primary"
            onClick={() => navigate('/')}
          />
        }
      />
    </Surface>
  );
};

export default NotFoundPage;
