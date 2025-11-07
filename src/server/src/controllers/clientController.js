    import { Client, User } from '../models/index.js';

export const getClientProfile = async (req, res) => {
  try {
    const id = req.params.id || req.user.id;
    const client = await Client.findOne({ where: { user_id: id }, include: [{ model: User, as: 'user', attributes: ['id','name','email'] }]});
    if (!client) return res.status(404).json({ message: 'Não encontrado' });
    return res.json(client);
  } catch (err) { console.error(err); return res.status(500).json({ message: 'Erro' }); }
};

export const updateClient = async (req, res) => {
  try {
    const id = req.params.id || req.user.id;
    const client = await Client.findOne({ where: { user_id: id } });
    if (!client) return res.status(404).json({ message: 'Não encontrado' });
    await client.update(req.body);
    return res.json(client);
  } catch (err) { console.error(err); return res.status(500).json({ message: 'Erro' }); }
};
