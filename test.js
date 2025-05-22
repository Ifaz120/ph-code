function getTimeString(time) {

  const hours = parseInt(time/3600);
  const remainingSeconds = time % 3600;
  const minutes = parseInt(remainingSeconds/ 60);
  const seconds = remainingSeconds % 60 ;

  return ` ${hours} hours ${minutes} minutes ${seconds} seconds ago`;
}

