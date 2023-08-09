import React from 'react';
import { useTranslation } from 'react-i18next';
import './DataDisplay.css';

const formatTime = dateTime => {
  //returns a time in the correct timezone
  return new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(dateTime.toString()));
};

const DataDisplay = props => {
  const { t } = useTranslation();
  const filteredData = props.filteredData
    .sort((a, b) => (a.scheduledTime > b.scheduledTime ? 1 : -1)) // sorting by time
    .map(train => ({
      ...train,
      time:
        train.actualTime &&
        formatTime(train.actualTime) !== formatTime(train.scheduledTime) ? ( //only if actual and scheduled arrival time differ, create special class (red) for actual time
          <>
            <span className="red">{formatTime(train.actualTime)}</span>
            <span className="under">({formatTime(train.scheduledTime)})</span>
          </>
        ) : (
          formatTime(train.scheduledTime)
        )