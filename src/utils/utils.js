import moment from 'moment';

export const timeFromNow = (timestamp) => moment(new Date(timestamp?.toDate())).fromNow();
