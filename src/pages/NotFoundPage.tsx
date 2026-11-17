import { Button } from '@astryxdesign/core/Button';
import { EmptyState } from '@astryxdesign/core/EmptyState';
import { FileQuestion } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '640px', margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
      <EmptyState
        title="404 — Page Not Found"
        description="The page you requested does not exist or has been relocated in the new Finservkart platform."
        icon={<FileQuestion size={48} color="#94a3b8" />}
        actions={
          <Button
            label="Return to Homepage"
            variant="primary"
            onClick={() => navigate('/')}
          />
        }
      />
    </div>
  );
};

export default NotFoundPage;
