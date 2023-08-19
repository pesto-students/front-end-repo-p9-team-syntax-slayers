interface Devices {
  device: 'Mobile' | 'Tablet' | 'iOS' | 'Android' | 'Desktop';
}

export const getDeviceType = (): Devices => {
  const userAgent = navigator.userAgent;

  if (/Mobi|Android/i.test(userAgent)) {
    return { device: 'Mobile' };
  } else if (/Tablet|iPad/i.test(userAgent)) {
    return { device: 'Tablet' };
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return { device: 'iOS' };
  } else if (/Android/i.test(userAgent)) {
    return { device: 'Android' };
  } else {
    return { device: 'Desktop' };
  }
};
