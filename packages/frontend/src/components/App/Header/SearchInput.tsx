/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Paper, InputBase, CircularProgress, makeStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { gql, useQuery } from "@apollo/client";

/**
<<<<<<< HEAD
 * Defines the type 'Community' to be used in this component.
 * 
=======
 * Defines the fields received by the `getCommunities` GraphQL call.
 *
>>>>>>> 9a49e9f0709f1f5d92472c4a014a78a5c9a6bbae
 * @internal
 */
interface Community {
  id: string;
  title: string;
  host: string;
}

const useStyles = makeStyles({
  root: {
    boxSizing: "unset",
    alignItems: "center",
    display: "flex",
    height: "100%",
    padding: "2px 16px",
    width: "50%",
  },
  fullWidth: {
    width: "100%",
  },
});

/**
 * GraphQL query to get the `id` and `title` of communities on a given host.
 *
 * @internal
 */
export const getCommunitiesQuery = gql`
  query($host: String!) {
    getCommunities(host: $host) {
      id
      title
    }
  }
`;

const getOptionLabel = (option: Community | string) => {
  if (typeof option === "string") {
    return option;
  } else {
    return option.title;
  }
};

/**
 * The search bar used to search for communities.
 *
 * Outline:
 *
 *  - Users can type a host name into the search bar to display a dropdown of the communities on that host.
 *
 *  - They can then click a community from the dropdown to be taken to the page of that community.
 *
 * @internal
 */
export function SearchInput(): ReactElement {
  const classes = useStyles();

  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [host, setHost] = React.useState("");
  const [selectedCommunity, setSelectedCommunity] = React.useState<Community | null>(null);
  const [community, setCommunity] = React.useState("");
  const [debouncedHost] = useDebounce(host, 400);

  const { loading, data, error } = useQuery(getCommunitiesQuery, {
    variables: { host: debouncedHost },
  });

  const onInputChange = (_: any, value: string) => {
    const input = value.split(" ");
    setHost(input[0]);

    if (input.length >= 2) {
      setCommunity(input.splice(1).join(" "));
    } else {
      setCommunity("");
    }
  };

  const optionsFilter = (options: Community[]) => {
    return options.filter((option) => {
      const lowerCaseTitle = option.title.toLowerCase();
      const lowerCaseCommunity = community.toLowerCase();

      return lowerCaseTitle.includes(lowerCaseCommunity);
    });
  };

  const onOpen = (_: any, reason: string) => {
    switch (reason) {
      case "escape":
      case "create-option":
        setOpen(true);
        break;

      default:
        setOpen(false);
        break;
    }
  };

  const onSelectChange = (_: any, value: Community | string) => {
    if (typeof value === "string") return;

    setSelectedCommunity(value);
  };

  const options = data
    ? data.getCommunities.map((community: Pick<Community, "id" | "title">) => {
        return {
          ...community,
          host: debouncedHost,
        };
      })
    : [];

  const showSpinner = (loading || debouncedHost !== host) && host !== "" && open;
  const openLoader = showSpinner || (error !== null && host !== "");
  const loadingText = showSpinner ? "Searching..." : "No communities found";

  if (selectedCommunity) {
    history.push(`/instances/${selectedCommunity.host}/communities/${selectedCommunity.id}/posts`);
  }

  return (
    <Paper className={classes.root}>
      <Autocomplete
        freeSolo
        disableClearable
        className={classes.fullWidth}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={onOpen}
        getOptionLabel={getOptionLabel}
        filterOptions={optionsFilter}
        options={options}
        loading={openLoader}
        loadingText={loadingText}
        onChange={onSelectChange}
        onInputChange={onInputChange}
        data-testid="autocomplete"
        renderInput={(params) => (
          <InputBase
            data-testid="searchbar"
            ref={params.InputProps.ref}
            placeholder="Find a community"
            className={classes.fullWidth}
            inputProps={params.inputProps}
            endAdornment={
              <React.Fragment>
                {showSpinner ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            }
          />
        )}
      />
    </Paper>
  );
}
