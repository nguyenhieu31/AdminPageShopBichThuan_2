import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import {login} from '../../redux/authentication/authentication';



export default function LoginView() {
  const theme = useTheme();
  const dispatch= useDispatch();
  const router = useRouter();
  const {isLogined}= useSelector((state)=>state.authentication);
  const [showPassword, setShowPassword] = useState(false);
  const [userName,setUserName]= useState('');
  const [password,setPassword]= useState('');
  useEffect(()=>{
    const accessToken= Cookies.get('accessToken');
    if(isLogined || accessToken!==undefined){
      router.push('/');
    }
  },[isLogined, router])
  const handleClick = () => {
    const checkUserNameValid= /[!@#$%^&*()?":{}|<>]/.test(userName); 
    const checkPasswordValid= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
    if(userName===''){
      toast.error('Trường tên đăng nhập không được để trống!');
      return;
    }
    if(password===''){
      toast.error('Trường mật khẩu không được để trống!');
      return;
    }
    if(!checkUserNameValid && !checkPasswordValid){
      const data= {
        userName,
        password
      }
      dispatch(login(data));
    }else{
      toast.error("Vui lòng nhập tài khoản và mật khẩu hợp lệ!");
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Tên Đăng Nhập" onChange={(e)=>{setUserName(e.target.value)}} />

        <TextField
          name="password"
          label="Mật Khẩu"
          type={showPassword ? 'text' : 'password'}
          onChange={(e)=>{setPassword(e.target.value)}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Quên mật khẩu?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={ handleClick}
      >
        Đăng nhập
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Đăng nhập </Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Chưa có tài khoản?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Bắt đầu
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Hoặc
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
