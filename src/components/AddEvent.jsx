import React, { useState } from 'react';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { host, header } from '../api';
import theme from '../theme';
import { refreshed } from '../actions';

const styles = theme => ({

  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
    height: 250,
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


const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const AddEvent = (props) => {
  const {
    classes, personId, user, refreshed,
  } = props;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState();
  const [eventType, setEventType] = useState();
  const [personVote, setPersonVote] = useState();
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();

  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = () => {
    axios.post(`${host}/admin/events`, {
      title,
      personVote,
      eventType,
      description,
      date,
      personId,
      url,
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
          <NoteAddIcon />
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
              新增事件
            </Typography>
            <Button color="secondary" variant="contained" onClick={handleSubmit}>
              新增
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <div className={classes.divider} />
          <DialogContentText>
            <Typography variant="caption">
              注意事項：
            </Typography>
          </DialogContentText>
          <div className={classes.divider} />
          <TextField
            fullWidth
            id="title"
            name="title"
            label="標題"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <div className={classes.divider} />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="內容"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <div className={classes.divider} />
          <TextField
            fullWidth
            id="url"
            name="url"
            label="網址"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <div className={classes.divider} />
          <InputLabel shrink htmlFor="age-label-placeholder">
            事件分類
          </InputLabel>
          <Select
            value={eventType}
            onChange={e => setEventType(e.target.value)}
            fullWidth
            input={<Input name="personVote" id="age-label-placeholder" />}
            name="eventType"
          >

            <MenuItem value="VOTE">投票</MenuItem>
            <MenuItem value="SPEECH">言論</MenuItem>
            <MenuItem value="MEDIA">媒體</MenuItem>
            <MenuItem value="OTHER">其他</MenuItem>
          </Select>
          { eventType === 'VOTE' && (
            <>
              <div className={classes.divider} />
              <InputLabel shrink htmlFor="age-label-placeholder">
            投票
              </InputLabel>
              <Select
                value={personVote}
                onChange={e => setPersonVote(e.target.value)}
                fullWidth
                input={<Input name="personVote" id="age-label-placeholder" />}
                name="personVote"
              >

                <MenuItem value="YES">贊成</MenuItem>
                <MenuItem value="NO">反對</MenuItem>
                <MenuItem value="ABSTAIN">棄權</MenuItem>
                <MenuItem value="ABSENT">缺席</MenuItem>
              </Select>
            </>
          )
          }
          <div className={classes.divider} />
          <MuiPickersUtilsProvider utils={MomentUtils}>

            <KeyboardDatePicker
              id="date"
              label="日期"
              value={date}
              onChange={d => setDate(d)}
              format="YYYY/MM/DD"
              fullWidth
            />

          </MuiPickersUtilsProvider>
        </DialogContent>
      </Dialog>
    </>


  );
};

const mapStateToProps = state => ({
  flatDistrict: state.flatDistrict,
  user: state.user,
});

export default connect(mapStateToProps, { refreshed })(withStyles(styles(theme))(AddEvent));
