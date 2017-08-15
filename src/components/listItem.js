import React from 'react';

const ListItem = ({listItem}) => {
    let domain = listItem.url;
    let match = domain && domain.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if ( match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0 ) domain =  match[2];

    let time = timeSince(listItem.time);    
    
    return (
		<li>
            <div className="rating">{listItem.score}</div>
            <div>
                <span><a className="title">{listItem.title}</a> {domain && <span>(<a href={`https://news.ycombinator.com/from?site=${domain}`}>{domain}</a>)</span>} - {listItem.type}</span>
                <span>by <a href={`https://news.ycombinator.com/user?id=${listItem.by}`}>{listItem.by}</a> {time} | <a href={`https://news.ycombinator.com/item?id=${listItem.id}`}>{listItem.descendants} comments</a></span>
            </div>
    </li>
	);
};

function timeSince(date) {

    let seconds = Math.floor(((new Date().getTime()/1000) - date)),
    interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + " year" + (interval > 1 ? "s" : "") +  " ago";

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + " month" + (interval > 1 ? "s" : "") +  " ago";

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + " day" + (interval > 1 ? "s" : "") +  " ago";

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " hour" + (interval > 1 ? "s" : "") +  " ago";

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + " minute" + (interval > 1 ? "s" : "") +  " ago";

    interval = Math.floor(seconds);
    return interval + " second" + (interval > 1 ? "s" : "") +  " ago";
}

export default ListItem;
