import { Surface } from '../components/Surface';
import { Button } from '@astryxdesign/core/Button';
import { EmptyState } from '@astryxdesign/core/EmptyState';
import { FileQuestion } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-11)", margin: "var(--spacing-fsk-3) auto", padding: "0 var(--spacing-fsk-2)", textAlign: 'center' }}>
      <EmptyState
        title="404 — Page Not Found"
        description="The page you requested does not exist or has been relocated in the new Finservkart platform."
        icon={<FileQuestion size={48} color="var(--color-fsk-57)" />}
        actions={
          <Button
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
