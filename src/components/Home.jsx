import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Assignment, MoneyOff, ThumbsUpDown } from '@material-ui/icons';
import theme from '../theme';

const backgroundImage = 'images/lion-rock-bw.jpg';
const useStyles = makeStyles({
  root: {
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '70vh',
      minHeight: 500,
      maxHeight: 1200,
    },
  },
  paper: {
    padding: theme.spacing(2, 2),
    color: grey[700],
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#000000', // Average color of the background image.
    backgroundPosition: 'center',
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1,
  },
  h3: {
    // fontFamily: "'Noto Sans HK', sans-serif",
    fontWeight: '800',
  },
  h6: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
    },
  },
  border: {
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
    border: '4px solid currentColor',
  },
  contentSection: {
    padding: theme.spacing(8, 5, 0, 5),
    textAlign: 'center',
  },
});

const Home = () => {
  const classes = useStyles(theme);


  return (
    <>
      <section className={classes.root}>
        <Container className={classes.container}>
          <div className={classes.border}>
            <Typography variant="h3" className={classes.h3}>
            選區事實處
            </Typography>
          </div>
          <Typography variant="h6" className={classes.h6}>
            選區以內 文宣以外 讓事實發聲
          </Typography>
          <div className={classes.backdrop} />
          <div className={classes.background} />
        </Container>
      </section>
      <Container maxWidth="md">
        <Grid container justify="center" spacing={2} className={classes.contentSection}>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="h5" paragraph>讓事實發聲</Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              本平台收集各區現任區議員及社區主任的資料及往跡，為大眾提供官方文宣以外另一個深入了解社區服務人仕的途徑。
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.contentSection}>
          <Grid item xs={12} sm={12} md={4}>
            <Assignment style={{ fontSize: 80 }} color="primary" />
            <Typography variant="subtitle1" paragraph>只有事實</Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              所有提交的內容必須有可靠及可驗證來源，例如官方會議記錄，傳媒報導，Youtube影片等。本平台只轉載及整理現有公開資訊，不會對個別內容作出評論。
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <MoneyOff style={{ fontSize: 80 }} color="error" />
            <Typography variant="subtitle1" paragraph>謝絕選舉宣傳</Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              本平台絕不收取任何資助或遵從任何議會議員/參選人的要求去選擇刊登或不刊登任何資料。另外本平台也不會分享或轉載任何競選宣傳。
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <ThumbsUpDown style={{ fontSize: 80 }} color="secondary" />
            <Typography variant="subtitle1" paragraph>Admin審核制度</Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              每項收集到的資料均會由 Admin 互相投票決定公開顯示與否。為免平台被濫用及保持資訊質素，Admin目前不對外開放申請。
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={2} className={classes.contentSection}>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="h5" paragraph>全民 Fact Check</Typography>
            <Typography variant="body2" color="textSecondary" paragraph>如欲報料，請電郵至 hkfactcheck@gmail.com 或聯絡 tg: (TBC)</Typography>
          </Grid>
        </Grid>
      </Container>

    </>
  );
};

export default Home;
