/*
 * CS3099 Group A3
 */

import React from "react";
import { Redirect } from "react-router-dom";
import { useDebounce } from "use-debounce";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import CircularProgress from "@material-ui/core/CircularProgress";
import { gql, useQuery } from "@apollo/client";
import styles from "./SearchInput.module.scss";

interface Community {
  id: string;
  title: string;
  host: string;
}

function getOptionLabel(option: Community | string) {
  if (typeof option === "string") {
    return option;
  } else {
    return option.title;
  }
}

const SearchInput = (): JSX.Element => {
  const getCommunities = gql`
    query($host: String!) {
      getCommunities(host: $host) {
        id
        title
      }
    }
  `;

  const [open, setOpen] = React.useState(false);
  const [host, setHost] = React.useState("");
  const [selectedCommunity, setSelectedCommunity] = React.useState<Community | null>(null);
  const [community, setCommunity] = React.useState("");
  const [debouncedHost] = useDebounce(host, 400);

  const { loading, data, error } = useQuery(getCommunities, {
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
    return (
      <Redirect
        to={`/instances/${selectedCommunity.host}/communities/${selectedCommunity.id}/posts`}
      />
    );
  } else {
    return (
      <Paper className={styles.searchRoot}>
        <Autocomplete
          freeSolo
          disableClearable
          className={styles.autocomplete}
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
          renderInput={(params) => (
            <InputBase
              ref={params.InputProps.ref}
              placeholder="Find a community"
              className={styles.autocompleteInput}
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
};

export default SearchInput;
