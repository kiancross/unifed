/*
 * Copyright (C) 2020 Robert Mardall
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2020 Allan Mathew Chacko
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { ReactElement, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Container } from "@material-ui/core";

import { PostCreator } from "../../components";

/**
 * Params taken by the [[`SubscribeButton`]] component.
 *
 * @internal
 */
export interface CreatePostPageParams {
  /**
   * Host of the community the post is being made to.
   */
  host: string;

  /**
   * The name of the community the post is being made to.
   */
  community: string;
}

/**
 * Allows users to create a post to a community.
 *
 * Outline:
 *
 *  - The user can create a post using a markdown editor.
 *
 * @internal
 */
export function CreatePostPage(): ReactElement {
  const { community, host } = useParams<CreatePostPageParams>();
  const [redirect, setRedirect] = useState<string | undefined>();

  const href = "/instances/" + host + "/communities/" + community + "/posts";

  const onSuccess = (id: string) => {
    setRedirect(href + "/" + id);
  };

  if (redirect) return <Redirect to={redirect} />;

  return (
    <Container style={{ paddingTop: "1.5rem" }} maxWidth="lg">
      <PostCreator
        community={community}
        host={host}
        submitButtonText="Create Post"
        onSuccess={onSuccess}
      />
    </Container>
  );
}
