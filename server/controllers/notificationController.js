import mailerSend from "../config/mailersendClient.js";
import supabase from "../config/supabaseClient.js";
import { EmailParams, Recipient, Sender } from "mailersend"

const LISTING_URL = 'http://localhost:3000/listings';

function buildEmail(event_type, listing, username) {
    const templates = {
        'COMMENT_ADDED': {
            subject: 'Someone commented on a listing you favorited',
            bodyHTML: `<p>Hi ${username},<p>
            <p>Someone just left a new comment on ${listing.title}. <a href="${LISTING_URL}/${listing.id}">Go check it out!</a></p>`
        },
        'LISTING_MODIFIED': {
            subject: 'A listing you favorited has been changed',
            bodyHTML: `<p>Hi ${username},<p>
            <p>The owner of ${listing.title} just made a change. <a href="${LISTING_URL}/${listing.id}">Go check it out!</a></p>`
        },
        'LISTING_DELETED': {
            subject: 'A listing you favorited has been deleted',
            bodyHTML: `<p>Hi ${username}</p>
            <p>It seems that the listing you favorited ${listing.title} has just been deleted! Don't worry, there's still plenty more to find at U-Commerce :D <a href="google.com">Totally real url</a></p>`
        }
    }

    return templates[event_type]
}

export async function notifyFavoritors(listing_id, actor_id, event_type) {
    const { data: favorites, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('listing_id', listing_id);

    const recipient_ids = favorites.map(fav => fav.user_id).filter(user_id => user_id !== actor_id);
    const recipients = [];
    for (const user_id of recipient_ids) {
        const { data: user_data } = await supabase
            .from('users')
            .select(`
                email,
                name
            `)
            .eq('id', user_id)
            .single();
        recipients.push(new Recipient(user_data.email, user_data.name));
    }

    const sender = new Sender("zmorales@test-r6ke4n1y7nvgon12.mlsender.net", "Zavier Morales");

    const { data: listing } = await supabase
        .from('listings')
        .select('*')
        .eq('id', listing_id)
        .single()

    for (const recipient of recipients) {
        const emailContent = buildEmail(event_type, listing, recipient.name);
        const emailParams = new EmailParams()
            .setFrom(sender)
            .setTo(recipients)
            .setSubject(emailContent.subject)
            .setHtml(emailContent.bodyHTML);
        await mailerSend.email.send(emailParams)
        // .then(response => console.log("email outcome:", response))
        .catch(error => console.log("error sending email:", error))
    }
};