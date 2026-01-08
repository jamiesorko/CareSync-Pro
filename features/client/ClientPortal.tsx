
import React from 'react';
import { Client, User } from '../../types';
import { Translate } from '../../components/Translate';
import PatientWellnessHub from './PatientWellnessHub';

interface Props {
  language: string;
  clients: Client[];
  user: User;
}

const ClientPortal: React.FC<Props> = ({ language, clients, user }) => {
  return (
    <div className="h-full">
      <PatientWellnessHub language={language} clients={clients} />
    </div>
  );
};

export default ClientPortal;
