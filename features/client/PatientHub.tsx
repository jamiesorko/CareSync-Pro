
import React from 'react';
import { Client } from '../../types';
import PatientWellnessHub from './PatientWellnessHub';

interface Props {
  clients: Client[];
}

const PatientHub: React.FC<Props> = ({ clients }) => {
  return (
    <div className="animate-in fade-in duration-1000">
      <PatientWellnessHub clients={clients} language="English" />
    </div>
  );
};

export default PatientHub;
