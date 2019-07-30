export const toggleMenu = key => ({
  type: 'TOGGLE_MENU',
  payload: {
    key,
  },
});

export const districtReceived = district => ({
  type: 'DISTRICT_RECEIVED',
  payload: {
    district,
  },
});

export const closeMenu = () => ({
  type: 'CLOSE_MENU',
});

export const toggleDrawer = () => ({
  type: 'DRAWER_TOGGLE',
});

export const setUser = user => ({
  type: 'SET_USER',
  payload: {
    user,
  },
});

export const setShortTitle = shortTitle => ({
  type: 'SET_SHORT_TITLE',
  payload: {
    shortTitle,
  },
});

export const toggleTextOnly = () => ({
  type: 'TOGGLE_TEXT_ONLY',
});

export const refreshed = () => ({
  type: 'REFRESHED',
});
