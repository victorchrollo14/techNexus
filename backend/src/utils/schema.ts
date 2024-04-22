interface user {
  userId: number;
  username: string;
  email: string;
  bio: string;
  profile_pic: string;
  follower_count: number;
  following_count: number;
  githubAuth: boolean;
  googleAuth: boolean;
  created_at: Date;
  updated_at: Date;
}

interface blog {
  blogId: number;
  title: string;
  author_id: string; // refences user(userId);
  content: string; // stored markdown in here;
  published: boolean;
  likes_count: number;
  views_count: number;
  comment_count: number;
  created_at: Date;
  updated_at: Date;
}

interface tags {
  tagId: number;
  tagName: string;
}

interface taggings {
  blogId: number; // references blog(blogId);
  tagId: number; // references tag(tagId);
}

interface likes {
  likeId: number;
  userId: number; // references User(userId);
  blogId: number; // references Blog(blogId);
  created_at: Date;
}

interface followers {
  followerId: number;
  userId: number;
  follower_user_id: number;
  created_at: Date;
}

interface comments {
  commentId: number;
  authorId: number;
  blogId: number; // references Blog(blogId)
  content: string;
  parentCommentId: number; // references Comments(commentId);
  created_at: Date;
  updated_at: Date;
}

interface bookmarks {
  bookmark_id: number;
  userId: number;
  blogId: number;
  created_at: Date;
}
