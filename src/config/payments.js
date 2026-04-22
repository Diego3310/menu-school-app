export function getFixedPaymentIcons() {
  const base = import.meta.env.BASE_URL;

  return {
    yape_icon: `${base}yape.png`,
    plin_icon: `${base}plin.png`,
  };
}

export function getDefaultSchoolAvatar() {
  return `${import.meta.env.BASE_URL}escolar.png`;
}

export function getWhatsappIcon() {
  return `${import.meta.env.BASE_URL}wsp.webp`;
}
