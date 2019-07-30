

const flatDistrict = (tree) => {
  const result = [];
  if (tree) {
    Object.keys(tree).forEach((region) => {
      Object.keys(tree[region]).forEach((district) => {
        Object.keys(tree[region][district]).forEach((constituency) => {
          result.push({
            k: `${region}-${district}-${constituency}`,
            v: `${tree[region][district][constituency]}: ${region}-${district}-${constituency}`,
          });
        });
      });
    });
  }
  return result.map(d => ({ value: d.k, label: d.v }));
};

export default (state = {}, action) => {
  switch (action.type) {
    case 'DISTRICT_RECEIVED':
      return { ...state, district: action.payload.district, flatDistrict: flatDistrict(action.payload.district) };
    case 'SET_USER':
      return { ...state, user: action.payload.user };
    case 'CLOSE_MENU':
      return { ...state, mobileOpen: false };
    case 'DRAWER_TOGGLE':
      return { ...state, mobileOpen: !state.mobileOpen };
    case 'REFRESHED':
      return { ...state, refreshAt: new Date() };
    case 'SET_SHORT_TITLE':
      return state.shortTitle === action.payload.shortTitle ? state
        : { ...state, shortTitle: action.payload.shortTitle };
    case 'TOGGLE_TEXT_ONLY':
      return { ...state, textOnly: !state.textOnly };
    default:
      return state;
  }
};
