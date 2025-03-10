const img = import.meta.glob('../assets/HomeImg/*.{png,jpg,jpeg}', { eager: true });

const imageMapper = Object.keys(img).reduce((acc, path) => {
  const name = path.split('/').pop().split('.')[0]; // Extrae el nombre del archivo
  acc[name] = img[path].default;
  return acc;
}, {});

export default imageMapper
