import { getfollowingList_db, getPostsList_db, getLikCount_db, getAuthorInfo_db, getLikedbyUser_db, getPosts_db } from "./feed.repo.js";

export async function buildFeed( userId, cursor, limit ){
    try {

        // build cursor snippet for db
        let cursorCondition = {};
        if (cursor) {
            cursorCondition = {
                OR: [
                    { postCreatedAt: { lt: cursor.createdAt } },
                    {
                        postCreatedAt: cursor.createdAt,
                        postId: { lt: cursor.id }
                    }
                ]
            };
        }

        // fetch all posts by followedIds
        const postsList = await getPostsList_db(userId, cursorCondition, limit);

        const postIds = postsList.map(p => p.postId);
        const authorIds = postsList.map(p => p.authorId);

        const posts = await getPosts_db( postIds );

        // fetch each post likes n make a map
        const likeCounts = await getLikCount_db(postIds);
        const likeCountMap = new Map( likeCounts.map(item => [item.postId, item._count] ));


        // fetch each post author info n make a map
        const authors = await getAuthorInfo_db(authorIds);
        const authorMap = new Map( authors.map(item => [item.id, item.username] ));


        // fetch user context likedByMe
        const liked = await getLikedbyUser_db(userId, postIds);
        const likedSet = new Set( liked.map(item => item.postId ));


        const items = posts.map(post => ({
            post,
            author: authorMap[post.userId],
            stats: {
                likeCount: likeCountMap.get(post.id) ?? 0,
                likedByMe: likedSet.has(post.id)
            }
        }));

        let nextCursor = null;

        if (posts.length === limit) {
            const last = posts[posts.length - 1];
            nextCursor = {
                createdAt: last.createdAt,
                postId: last.id
            };
        }

        return { items, nextCursor };
    }
    catch (error) {
        throw (error);
    }

}