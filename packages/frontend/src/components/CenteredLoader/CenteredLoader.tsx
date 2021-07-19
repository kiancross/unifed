/*
 * Copyright (C) 2020 Allan Mathew Chacko
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
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

import { ReactElement } from "react";
import { CircularProgress, CircularProgressProps, Grid } from "@material-ui/core";

/**
 * The loading spinner used when data is being retrieved e.g. during a GraphQL call.
 *
 * @internal
 */
export function CenteredLoader(props: CircularProgressProps): ReactElement {
  return (
    <Grid style={{ height: "100%" }} container justifyContent="center" alignItems="center" xs={12} item>
      <CircularProgress {...props} />
    </Grid>
  );
}
