import React, { useContext, useState } from 'react';
import { Button, Card, Icon, Label, Image, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import ShareButton from './ShareButton';
import MyPopup from '../util/MyPopup';

// Array of 30 verified working avatars
const avatars = [
  'https://semantic-ui.com/images/avatar2/large/kristy.png',
  'https://semantic-ui.com/images/avatar2/large/matthew.png',
  'https://semantic-ui.com/images/avatar2/large/molly.png',
  'https://semantic-ui.com/images/avatar2/large/elyse.png',
  'https://semantic-ui.com/images/avatar/large/elliot.jpg',
  'https://semantic-ui.com/images/avatar/large/jenny.jpg',
  'https://semantic-ui.com/images/avatar/large/joe.jpg',
  'https://semantic-ui.com/images/avatar/large/justen.jpg',
  'https://semantic-ui.com/images/avatar/large/laura.jpg',
  'https://semantic-ui.com/images/avatar/large/matt.jpg',
  'https://semantic-ui.com/images/avatar/large/nan.jpg',
  'https://semantic-ui.com/images/avatar/large/steve.jpg',
  'https://semantic-ui.com/images/avatar/large/stevie.jpg',
  'https://semantic-ui.com/images/avatar/large/veronika.jpg',
  'https://semantic-ui.com/images/avatar/large/daniel.jpg',
  'https://semantic-ui.com/images/avatar2/large/mark.png',
  'https://semantic-ui.com/images/avatar2/large/rachel.png',
  'https://semantic-ui.com/images/avatar2/large/lindsay.png',
  'https://semantic-ui.com/images/avatar2/large/patrick.png',
  'https://semantic-ui.com/images/avatar2/large/eve.png',
  'https://semantic-ui.com/images/avatar/large/helen.jpg',
  'https://semantic-ui.com/images/avatar/large/christian.jpg',
  'https://semantic-ui.com/images/avatar/large/tom.jpg',
  'https://semantic-ui.com/images/avatar2/large/lena.png',
  'https://semantic-ui.com/images/avatar/large/chris.jpg',
  'https://semantic-ui.com/images/avatar/large/bob.jpg',
  'https://semantic-ui.com/images/avatar2/large/ade.jpg',
  'https://semantic-ui.com/images/avatar/large/zoe.jpg',
  'https://semantic-ui.com/images/avatar/large/paul.jpg',
  'https://semantic-ui.com/images/avatar/large/jerry.png'
];

// Function to get consistent avatar for a username
function getAvatarForUsername(username) {
  // Add error handling for the avatar selection
  try {
    const index = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatars[index % avatars.length] || avatars[0]; // Fallback to first avatar if calculation fails
  } catch (error) {
    return avatars[0]; // Default to first avatar in case of any error
  }
}

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const truncatedBody = body.length > 30 ? body.substring(0, 30) + '...' : body;

  return (
    <Card fluid className="post-card">
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={getAvatarForUsername(username)}
          circular
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = avatars[0];
          }}
        />
        <div className="header-container">
          <Card.Header as={Link} to={`/profile/${username}`} style={{ cursor: 'pointer' }} className="username">
            {username}
          </Card.Header>
          {user && user.username === username && (
            <DeleteButton postId={id} size="small" className="delete-button" style={{ marginLeft: 'auto' }} />
          )}
        </div>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description className="post-body">
          {truncatedBody}
          {body.length > 30 && (
            <span onClick={toggleModal} style={{ color: 'blue', cursor: 'pointer' }}>
              {' See more'}
            </span>
          )}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {/* Button container */}
        <div className="button-container">
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <MyPopup content="Comment on post">
            <Button labelPosition="right" as={Link} to={`/posts/${id}`} className="comment-button">
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </MyPopup>
          <ShareButton postId={id} />
        </div>
      </Card.Content>
      <Modal
        open={modalOpen}
        onClose={toggleModal}
        size="small"
        closeIcon
        className="animated-modal"
      >
        <Modal.Header>{username}</Modal.Header>
        <Modal.Content scrolling style={{ maxHeight: 'auto', backgroundColor: 'lightgray' }}>
          <p style={{ color: 'black', fontSize: '1.2em', fontFamily: 'Lucida Console' }}>{body}</p>
        </Modal.Content>
      </Modal>
      <style jsx>{`
        .post-card {
          border-radius: 20px;
          font-family: 'Lucida Console';
          position: relative;
          height: 210px;
          overflow: hidden;
          background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: backgroundAnimation 3s infinite alternate;
        }

        .post-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .username {
          font-family: 'Lucida Console';
          font-size: 1.2em;
          color: black; /* Set username color to black */
        }

        .post-body {
          font-size: 1.2em;
          font-family: 'Lucida Console';
        }

        .header-container {
          display: flex;
          align-items: center;
        }

        .button-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 6px; /* Add gap between buttons */
        }

        .comment-button {
          flex: 1; /* Make comment button the same size as like button */
        }

        .delete-button {
          background: none !important;
          color: NONE !important;
          BACKGROUND-COLOR: NONE !IMPORTANT;
        }

        @media (max-width: 768px) {
          .post-card {
            height: auto;
          }

          .button-container {
            flex-direction: column;
            align-items: flex-start;
          }

          .button-container > * {
            margin-bottom: 10px;
          }
        }

        .animated-modal {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes backgroundAnimation {
          0% {
            background: linear-gradient(135deg,rgba(196, 196, 196, 0.71),rgba(195, 207, 226, 0.71));
          }
          50% {
            background: linear-gradient(135deg,rgba(180, 181, 183, 0.71),rgba(245, 247, 250, 0.71));
          }
          100% {
            background: linear-gradient(135deg,rgba(252, 252, 252, 0.71),rgba(195, 207, 226, 0.71));
          }
        }
      `}</style>
    </Card>
  );
}

export default PostCard;