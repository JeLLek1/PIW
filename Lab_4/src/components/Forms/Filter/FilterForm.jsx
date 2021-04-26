import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Title from 'components/Tittle';
import { InputGroup } from '../style';
import tags from 'config/data/tags';

class AddForm extends React.Component {
  render() {
    return (
      <form>
        <Title variant="h3" component="h2">
          Szukaj
        </Title>
        <InputGroup>
          <TextField
            label="Imię"
            fullWidth
            variant="outlined"
            name="sName"
            size="small"
            value={this.props.options.name}
            onChange={ev => {
              this.props.changeOptions('name', ev.target.value);
            }}
          />
        </InputGroup>
        <InputGroup>
          <TextField
            label="Opis"
            fullWidth
            variant="outlined"
            name="sDesc"
            size="small"
            value={this.props.options.description}
            onChange={ev => {
              this.props.changeOptions('description', ev.target.value);
            }}
          />
        </InputGroup>
        <InputGroup>
          <Autocomplete
            multiple
            value={this.props.options.tags}
            onChange={(_, newValue) => {
              this.props.changeOptions('tags', newValue);
            }}
            options={tags}
            getOptionLabel={tag => tag.title}
            name="sTags"
            renderInput={params => (
              <TextField
                {...params}
                label="Tagi"
                variant="outlined"
                size="small"
              />
            )}
            renderOption={option => (
              <Typography noWrap>{option.title}</Typography>
            )}
          />
        </InputGroup>
      </form>
    );
  }
}

export default AddForm;
