import supabase from '../config/supabaseClient.js'

export const getAllListings = async (req, res) => {
    const { category, listing_type, min_price, max_price } = req.query

    let query = supabase
        .from('listings')
        .select('*, users(name, college, profile_picture)')
        .eq('status', 'active')
        .order('created_at', { ascending: false })

    if (category) query = query.eq('category', category)
    if (listing_type) query = query.eq('listing_type', listing_type)
    if (min_price) query = query.gte('price', min_price)
    if (max_price) query = query.lte('price', max_price)

    const { data, error } = await query

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
}

export const getListingById = async (req, res) => {
    const { id } = req.params

    const { data, error } = await supabase
        .from('listings')
        .select('*, users(name, college, profile_picture)')
        .eq('id', id)
        .single()

    if (error) return res.status(404).json({ error: 'Listing not found' })
    return res.status(200).json(data)
}

export const createListing = async (req, res) => {
    const { owner_id, title, description, price, category, listing_type, images } = req.body

    const { data, error } = await supabase
        .from('listings')
        .insert({ owner_id, title, description, price, category, listing_type, images })
        .select()
        .single()

    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data)
}

export const updateListing = async (req, res) => {
    const { id } = req.params
    const updates = req.body

    const { data, error } = await supabase
        .from('listings')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
}

export const deleteListing = async (req, res) => {
    const { id } = req.params

    const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id)

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ message: 'Listing deleted' })
}