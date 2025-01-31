import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';

//import AdminAddbar from './adminAddbar';
import { Container } from '@mui/system';

/*
function createData(name, sn, classes, inter, ok) {
  return {
    name,
    sn,
    classes,
    inter,
    ok,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}
*/
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow component="div" sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="right">{row.sn}</StyledTableCell>
      </StyledTableRow>
      <TableRow component="div">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                진료기록
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>날짜</TableCell>
                    <TableCell align="right">진료과</TableCell>
                    <TableCell align="right">처방 내용</TableCell>
                    <TableCell align="right">분류 상태</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.history && row.history.map((historyRow) => (
                    <StyledTableRow key={historyRow.origin}>
                      <StyledTableCell component="th" scope="row">
                        {historyRow.day}
                      </StyledTableCell>
                      <StyledTableCell align="right">{historyRow.hospital}</StyledTableCell>
                      <StyledTableCell align="right">{historyRow.inter}</StyledTableCell>
                      <StyledTableCell align="right">{historyRow.ok}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    sn: PropTypes.string,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        hospital: PropTypes.string,
        day: PropTypes.string,
        inter: PropTypes.string,
        ok: PropTypes.number,
      }),
    ).isRequired,
  }).isRequired,
};


/*
const rows = [
  createData('남혁', '21', '병장', '진료중인듯?', false),
  createData('서한유', '22', '상병',  '진료완료', false),
];
*/
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function AdminTracker() {
  
  const [userList, setUserList] = React.useState(null);

  function getUserListPrivate () {

    let reqOtion = {
      credentials: 'include',
      method : "get",
      headers : {
        "content-type" : "application/json"
      }
    }
    fetch('http://127.0.0.1:5000/main/traking', reqOtion)
    .then((response) => response.json())
    .then((data) => setUserList(data));
  }
  
  React.useEffect(() => {
    getUserListPrivate();
  }, []);

  return (
    <Container component='main' maxWidth>
        <TableContainer component={Paper}>
        <Table component="div" aria-label="군인 병원 기록">
            <TableHead>
            <TableRow>
                <StyledTableCell/>
                <StyledTableCell>이름</StyledTableCell>
                <StyledTableCell align="right">군번</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {userList && userList.map((row) => (
                <Row key={row._id} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
      </Container>
  );
}
