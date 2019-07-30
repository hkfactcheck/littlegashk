import React, { useState } from 'react';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import CoreSelect from '@material-ui/core/Select';
import { emphasize } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { host, header } from '../api';
import theme from '../theme';
import { refreshed } from '../actions';
import tagValues from './TagValues';

const styles = theme => ({

  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
});


function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}


function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}


function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}


function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}


function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}


function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}


function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}


function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};


const tagChoices = tagValues.map(choice => ({
  value: choice,
  label: choice,
}));

const selectStyles = {
  input: base => ({
    ...base,
    color: theme.palette.text.primary,
    '& input': {
      font: 'inherit',
    },
  }),
};

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const EditPerson = (props) => {
  const {
    classes, user, refreshed, person,
  } = props;
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState(person.tags ? person.tags.map(t => ({ label: t, value: t })) : []);
  const [pa, setPa] = useState(person.politicalAffiliation);
  const [imageUrl, setImageUrl] = useState(person.imageUrl);
  const [background, setBackground] = useState(person.background);
  const [pf, setPf] = useState(person.politicalFaction);
  const [socialMedia, setSocialMedia] = useState(person.socialMedia);

  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = () => {
    axios.put(`${host}/admin/persons`, {
      personId: person.personId,
      imageUrl,
      background,
      tags: tags ? tags.map(t => t.value) : [],
      politicalAffiliation: pa,
      politicalFaction: pf,
      socialMedia,
    }, header(user))
      .then(() => {
        setOpen(false);
        enqueueSnackbar('已成功新增');
        refreshed();
      })
      .catch((error) => {
        enqueueSnackbar(`操作失敗: ${error.response.data.message}`);
      });
  };
  return (


    <>
      {user
      && (
      <IconButton color="secondary" aria-label="Edit" onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      )
      }
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setOpen(false)} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              修改地區人員:
              {' '}
              {person.name}
            </Typography>
            <Button color="secondary" variant="contained" onClick={handleSubmit}>
              提交
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <div className={classes.divider} />


          <InputLabel shrink htmlFor="age-label-placeholder">
            政治派系
          </InputLabel>
          <CoreSelect
            value={pf}
            onChange={e => setPf(e.target.value)}
            fullWidth
            input={<Input name="pf" id="age-label-placeholder" />}
            name="politicalFaction"
          >

            <MenuItem value="PANDEMO">泛民</MenuItem>
            <MenuItem value="PROESTAB">建制</MenuItem>
            <MenuItem value="OTHER">獨立/其他</MenuItem>
          </CoreSelect>
          <div className={classes.divider} />
          <TextField
            fullWidth
            id="politicalAffiliation"
            name="politicalAffiliation"
            label="政黨"
            value={pa}
            onChange={e => setPa(e.target.value)}
          />
          <div className={classes.divider} />
          <TextField
            fullWidth
            id="imageUrl"
            name="imageUrl"
            label="圖片網址"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
          <div className={classes.divider} />
          <TextField
            fullWidth
            id="socialMedia"
            name="socialMedia"
            label="Facebook"
            value={socialMedia}
            onChange={e => setSocialMedia(e.target.value)}
          />
          <div className={classes.divider} />
          <TextField
            fullWidth
            id="background"
            name="background"
            label="背景資料"
            value={background}
            onChange={e => setBackground(e.target.value)}
          />

          <div className={classes.divider} />
          <Select
            classes={classes}
            styles={selectStyles}
            inputId="react-select-multiple"
            TextFieldProps={{
              label: '標籤',
              InputLabelProps: {
                htmlFor: 'react-select-multiple',
                shrink: true,
              },
              placeholder: '選取標籤',
            }}
            options={tagChoices}
            components={components}
            value={tags}
            onChange={setTags}
            isMulti
          />

        </DialogContent>
      </Dialog>
    </>


  );
};

const mapStateToProps = state => ({
  flatDistrict: state.flatDistrict,
  user: state.user,
});

export default connect(mapStateToProps, { refreshed })(withStyles(styles(theme))(EditPerson));
