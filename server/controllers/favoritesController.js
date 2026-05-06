import supabase from "../config/supabaseClient.js";

export const getFavoritesByUserID = async (req, res) => {
    const user_id = req.params;
    const {data, error} = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', user_id);

    if (error) return res.status(404).json({error: "favorites doesn't exist"});
    return res.status(200).json(data);
}

export const createFavorite = async (req, res) => {
    const { user_id, listing_id } = req.body;

    const { data , error} = await supabase
    .from('favorites')
    .insert({
        user_id,
        listing_id,
    })
    .select()
    .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
}

export const deleteFavorite = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('listing_id', id);

    if (error) {console.log(error); return res.status(500).json({error: error.message});}
    return res.status(500).json({ message: "Favorite deleted" })
}