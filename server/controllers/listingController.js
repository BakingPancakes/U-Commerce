import supabase from '../config/supabaseClient.js'

export const getAllListings = async (req, res) => {
  const { category, listing_type, min_price, max_price } = req.query

  let query = supabase
    .from('listings')
    .select(`
      *,
      users (
        name,
        profile_picture,
        colleges (
          name
        )
      ),
      categories (
        name,
        display_name
      ),
      listing_types (
        type,
        display_name
      )
    `)
    .eq('status_id', 1)
    .order('created_at', { ascending: false })

  if (category) query = query.eq('category_id', category)
  if (listing_type) query = query.eq('listing_type_id', listing_type)
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
        .select(`
            *,
            users (
                name,
                profile_picture,
                colleges (
                    name
                )
            )
        `)
        .eq('id', id)
        .single()

    if (error) return res.status(404).json({ error: 'Listing not found' })
    return res.status(200).json(data)
}

export const createListing = async (req, res) => {
    const { owner_id, title, description, price, category_id, listing_type_id, images } = req.body

    const { data, error } = await supabase
        .from('listings')
        .insert({
            owner_id,
            title,
            description,
            price,
            category_id,
            listing_type_id,
            images
        })
        .select(`
            *,
            users (
                name,
                profile_picture,
                colleges ( name )
            )
        `)
        .single()

    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data)
}

export const updateListing = async (req, res) => {
    const { id } = req.params
    const updates = req.body

    const { data, error } = await supabase
        .from('listings')
        .update({
            ...updates,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select(`
            *,
            users (
                name,
                profile_picture,
                colleges ( name )
            )
        `)
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

export const getAllCategories = async (req, res) => {
  const { data, error } = await supabase
    .from('categories')
    .select('id, display_name')

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json(data)
}

export const getListingComments = async (req, res) => {
    const { id } = req.params

    const { data, error } = await supabase
    .from('comments')
    .select(`
      id,
      comment,
      rating,
      created_at,
      users:commenter_id (
        name
      )
    `)
    .eq('listing_id', id)
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json(data)
}

export const createComment = async (req, res) => {
  const { commenter_id, listing_id, comment, rating } = req.body

  const { data, error } = await supabase
    .from('comments')
    .insert([
      { commenter_id, listing_id, comment, rating }
    ])
    .select()

  if (error) return res.status(500).json({ error: error.message })
  return res.status(201).json(data[0])
}

export const updateComment = async (req, res) => {
  const { id } = req.params
  const { comment, rating } = req.body

  const { data, error } = await supabase
    .from('comments')
    .update({ comment, rating })
    .eq('id', id)
    .select()

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json(data[0])
}

export const deleteComment = async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id)

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ message: "Comment deleted" })
}


