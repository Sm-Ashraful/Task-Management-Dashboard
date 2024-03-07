import PropTypes from 'prop-types';

import { Button } from '@mui/material';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
};

export default function ReactionButtons({ post }) {
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <Button sx={{ minWidth: 'auto' }} key={name} type="button">
      {emoji} {post.reactions[name]}
    </Button>
  ));

  return <div>{reactionButtons}</div>;
}

ReactionButtons.propTypes = {
  post: PropTypes.object,
};
