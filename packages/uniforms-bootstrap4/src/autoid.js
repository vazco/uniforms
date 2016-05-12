import shortid        from 'shortid';

export default function autoid (id) {
  return id ? id : shortid();
}

