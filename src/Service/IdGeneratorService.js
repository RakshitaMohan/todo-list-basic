import ShortUniqueId from 'short-unique-id';

const generateId = () => {
  const { randomUUID } = new ShortUniqueId({ length: 12 });

  const id = randomUUID();

  return id;
}

const service = {
  generateId,
}

export default service;