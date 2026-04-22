import supabase from '../config/supabaseClient.js'

export const getUserByID = async (req, res) => {
    const {id} = req.params
    const {data, error} = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

    if (error) return res.status(404).json({error: "User doesn't exist"})
    return res.status(200).json(data)
}

export const createUser = async (req, res) => {
    const { auth0_id, email, name, college } = req.body
    const { data, error } = await supabase
        .from('users')
        .insert({ auth0_id, email, name, college })
        .select()
        .single()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data)
}
export const updateUser = async (req, res) => {
    const { id } = req.params
    const updates = req.body
    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
}
