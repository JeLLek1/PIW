import React from 'react';
import {
  TextField,
  Typography,
  Button,
  FormHelperText,
  Avatar,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Title from 'components/Tittle';
import { InputGroup } from '../style';
import { FileLabel, ImageContainer } from './style';
import { validationSchema } from './utils';
import tags from 'config/data/tags';

class AddForm extends React.Component {
  defaultFormValues = {
    name: '',
    description: '',
    email: '',
    tags: [],
    image: '',
  };

  constructor(props) {
    super(props);

    this.fileInputRef = React.createRef(null);
    this.fileLabelRef = React.createRef(null);

    let defaultWalues = this.defaultFormValues;
    if (this.props.defaultValues) {
      defaultWalues = this.props.defaultValues;
    }

    this.state = {
      imageName: 'Brak',
      submited: false,
      formValues: { ...defaultWalues },
      errors: {
        name: false,
        description: false,
        email: false,
        tags: false,
        image: false,
      },
      defaultValues: this.props.defaultValues
        ? this.props.defaultValues
        : { ...this.defaultFormValues },
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.defaultValues !== this.props.defaultValues) {
      this.setState({
        defaultValues: this.props.defaultValues
          ? { ...this.props.defaultValues }
          : { ...this.defaultFormValues },
        formValues: this.props.defaultValues
          ? { ...this.props.defaultValues }
          : { ...this.defaultFormValues },
      });
    }
  }

  uploadButtonClick(_) {
    if (this.fileInputRef.current === null) return;

    this.fileInputRef.current.click();
  }

  handleValidate(name) {
    validationSchema()
      .validateAt(name, this.state.formValues)
      .then(() => {
        const formErrors = { ...this.state.errors };
        formErrors[name] = false;
        this.setState({ errors: formErrors });
      })
      .catch(err => {
        const formErrors = { ...this.state.errors };
        formErrors[name] = err.message;
        this.setState({ errors: formErrors });
      });
  }

  handleFormChange(name, value) {
    const formValues = { ...this.state.formValues };
    formValues[name] = value;
    this.setState({ formValues: formValues }, () => {
      if (this.state.submited) {
        this.handleValidate(name);
      }
    });
  }

  fileInputChange(ev) {
    if (!ev.target.files?.length) {
      return;
    }
    const file = ev.target.files[0];
    var reader = new FileReader();
    reader.onload = ev => {
      this.handleFormChange('image', ev.target.result);
      this.setState({
        imageName: file.name,
      });
    };
    reader.readAsDataURL(file);
  }

  submitForm(ev) {
    ev.preventDefault();
    const data = this.state.formValues;
    validationSchema()
      .validate(data, { abortEarly: false })
      .then(data => {
        this.setState({
          formValues: { ...this.state.defaultValues },
          submited: false,
          imageName: 'Brak',
        });
        this.props.addAccount(data);
      })
      .catch(err => {
        this.setState({
          submited: true,
        });
        Object.keys(this.state.formValues).forEach(key => {
          this.handleValidate(key);
        });
      });
    return false;
  }

  render() {
    return (
      <form onSubmit={ev => this.submitForm(ev)}>
        <Title variant="h3" component="h2">
          {this.props.title}
        </Title>
        <InputGroup>
          <TextField
            label={this.props.label.name}
            fullWidth
            variant="outlined"
            name="name"
            value={this.state.formValues.name}
            onChange={ev => {
              this.handleFormChange('name', ev.target.value);
            }}
            error={this.state.errors.name !== false}
            helperText={this.state.errors.name}
          />
        </InputGroup>
        <InputGroup>
          <TextField
            label="Opis"
            fullWidth
            multiline
            variant="outlined"
            name="description"
            value={this.state.formValues.description}
            onChange={ev => {
              this.handleFormChange('description', ev.target.value);
            }}
            error={this.state.errors.description !== false}
            helperText={this.state.errors.description}
          />
        </InputGroup>
        <InputGroup>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            name="email"
            value={this.state.formValues.email}
            onChange={ev => {
              this.handleFormChange('email', ev.target.value);
            }}
            error={this.state.errors.email !== false}
            helperText={this.state.errors.email}
          />
        </InputGroup>
        <InputGroup>
          <Autocomplete
            multiple
            value={this.state.formValues.tags}
            onChange={(_, newValue) => {
              this.handleFormChange('tags', newValue);
            }}
            options={tags}
            getOptionLabel={tag => tag.title}
            name="tags"
            getOptionSelected={(option, value) => {
              return option.key === value.key;
            }}
            renderInput={params => (
              <TextField
                {...params}
                label="Tagi"
                variant="outlined"
                error={this.state.errors.tags !== false}
                helperText={this.state.errors.tags}
              />
            )}
            renderOption={option => (
              <Typography noWrap>{option.title}</Typography>
            )}
          />
        </InputGroup>
        <InputGroup>
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            style={{ display: 'none' }}
            ref={this.fileInputRef}
            onChange={ev => this.fileInputChange(ev)}
          />
          <Button
            variant="contained"
            color="default"
            component="span"
            onClick={ev => this.uploadButtonClick(ev)}
          >
            {this.props.label.image}
          </Button>
          <ImageContainer>
            <Avatar src={this.state.formValues.image} />
          </ImageContainer>
          <FileLabel
            ref={this.fileLabelRef}
            error={this.state.errors.image !== false ? 1 : 0}
          >
            {this.state.imageName}
          </FileLabel>
          <FormHelperText variant="outlined" error={true}>
            {this.state.errors.image}
          </FormHelperText>
        </InputGroup>
        <InputGroup>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            {this.props.submitTitle}
          </Button>
        </InputGroup>
        <InputGroup></InputGroup>
      </form>
    );
  }
}

export default AddForm;
