import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';

import { reactionToAdded } from 'src/store/slices/taskSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
};

export default function ReactionButtons({ post }) {

  const dispatch = useDispatch()
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    console.log(post.id)
    return <Button sx={{ minWidth: 'auto' }} key={name} type="button" onClick={(e) => {
      e.stopPropagation()
      dispatch(reactionToAdded({ taskId: post.id, reaction: name }))
    }

    }>
      {emoji} {post.reactions[name]}
    </Button>

  })


  return <div>{reactionButtons}</div>;
}

ReactionButtons.propTypes = {
  post: PropTypes.object,
};
