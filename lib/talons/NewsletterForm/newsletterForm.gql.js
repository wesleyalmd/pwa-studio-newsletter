import { gql } from '@apollo/client';

const SUBSCRIBE_NEWSLETTER = gql`
  mutation subscribeNewsletter($email: String!) {
    subscribeEmailToNewsletter(email: $email) {
      status
    }
  }
`;

export default {
  subscribeNewsletterMutation: SUBSCRIBE_NEWSLETTER
};
