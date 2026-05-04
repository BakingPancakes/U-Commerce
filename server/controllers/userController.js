import supabase from '../config/supabaseClient.js'

export const getUserByID = async (req, res) => {
    const id = req.auth.payload.sub
    console.log("Retrieving user with id:", id)
    const {data, error} = await supabase
    .from('users')
    .select('*')
    .eq('auth0_id', id)
    .single()
    if (error) return res.status(404).json({error: "User doesn't exist"})
    return res.status(200).json(data)
}

export const createUser = async (req, res) => {
    const { sub, email, name, college_id } = req.body;

    const auth0_id = sub;
    const bio = "Update Your Default Bio"; // default bio

    //console.log("creating user with id:", sub);
    //console.log("Incoming body:", req.body);
    
    const { data, error } = await supabase
        .from('users')
        .insert({
            auth0_id,
            email,
            name,
            college_id,
            bio           
        })
        .select()
        .single();

    if (error) {
        console.log("Supabase error:", error);
        return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
};


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
