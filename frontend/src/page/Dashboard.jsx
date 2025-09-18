import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress
} from "@mui/material";
import {
  AccountBalance,
  Send,
  Add,
  History,
  AccountBalanceWallet,
  Logout
} from "@mui/icons-material";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [transferDialog, setTransferDialog] = useState(false);
  const [addBankDialog, setAddBankDialog] = useState(false);
  const [addMoneyDialog, setAddMoneyDialog] = useState(false);
  
  // Form states
  const [transferForm, setTransferForm] = useState({
    receiver_username: "",
    amount: "",
    description: "",
    bank_account_id: ""
  });
  const [bankForm, setBankForm] = useState({
    account_number: "",
    bank_name: "",
    ifsc: "",
    account_holder_name: ""
  });
  const [addMoneyForm, setAddMoneyForm] = useState({
    amount: "",
    bank_account_id: ""
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBankAccounts();
    fetchTransactions();
  }, [user, navigate]);

  const fetchBankAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/user/banks');
      setBankAccounts(response.data.accounts);
    } catch (error) {
      console.error('Failed to fetch bank accounts:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/user/transactions');
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  const handleTransfer = async () => {
    if (!transferForm.receiver_username || !transferForm.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/user/transfer', transferForm);
      toast.success('Transfer completed successfully!');
      setTransferDialog(false);
      setTransferForm({ receiver_username: "", amount: "", description: "", bank_account_id: "" });
      fetchTransactions();
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Transfer failed');
    }
    setLoading(false);
  };

  const handleAddBank = async () => {
    if (!bankForm.account_number || !bankForm.bank_name || !bankForm.ifsc || !bankForm.account_holder_name) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:4000/api/user/addbank', bankForm);
      toast.success('Bank account added successfully!');
      setAddBankDialog(false);
      setBankForm({ account_number: "", bank_name: "", ifsc: "", account_holder_name: "" });
      fetchBankAccounts();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add bank account');
    }
    setLoading(false);
  };

  const handleAddMoney = async () => {
    if (!addMoneyForm.amount || !addMoneyForm.bank_account_id) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:4000/api/user/addmoney', addMoneyForm);
      toast.success('Money added successfully!');
      setAddMoneyDialog(false);
      setAddMoneyForm({ amount: "", bank_account_id: "" });
      fetchTransactions();
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add money');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getTransactionType = (transaction) => {
    if (transaction.sender_id === user.id) {
      return transaction.receiver_username ? `Sent to ${transaction.receiver_username}` : 'Payment';
    } else {
      return `Received from ${transaction.sender_username}`;
    }
  };

  const getTransactionAmount = (transaction) => {
    if (transaction.sender_id === user.id) {
      return `-₹${transaction.amount}`;
    } else {
      return `+₹${transaction.amount}`;
    }
  };

  const getAmountColor = (transaction) => {
    if (transaction.sender_id === user.id) {
      return 'error.main';
    } else {
      return 'success.main';
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Sidebar */}
      <Box sx={{ 
        width: 280, 
        bgcolor: '#1a1a1a', 
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        p: 3
      }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
            PayApp
          </Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>
            Welcome, {user?.full_name}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          {[
            { id: 'overview', label: 'Overview', icon: <AccountBalanceWallet /> },
            { id: 'transfer', label: 'Transfer Money', icon: <Send /> },
            { id: 'banks', label: 'Bank Accounts', icon: <AccountBalance /> },
            { id: 'transactions', label: 'Transactions', icon: <History /> },
            { id: 'addmoney', label: 'Add Money', icon: <Add /> }
          ].map((item) => (
            <Button
              key={item.id}
              fullWidth
              startIcon={item.icon}
              onClick={() => setActiveSection(item.id)}
              sx={{
                justifyContent: 'flex-start',
                mb: 1,
                color: activeSection === item.id ? '#4caf50' : 'white',
                bgcolor: activeSection === item.id ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Button
          fullWidth
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{
            justifyContent: 'flex-start',
            color: '#ff5722',
            '&:hover': {
              bgcolor: 'rgba(255, 87, 34, 0.1)'
            }
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <ToastContainer />

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
              Dashboard Overview
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: '#4caf50', color: 'white' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Wallet Balance
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                      ₹{user?.balance || 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: '#2196f3', color: 'white' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Bank Accounts
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                      {bankAccounts.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: '#ff9800', color: 'white' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Total Transactions
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                      {transactions.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Recent Transactions
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.slice(0, 5).map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{getTransactionType(transaction)}</TableCell>
                        <TableCell sx={{ color: getAmountColor(transaction), fontWeight: 'bold' }}>
                          {getTransactionAmount(transaction)}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={transaction.status} 
                            color={getStatusColor(transaction.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{formatDate(transaction.created_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        )}

        {/* Transfer Money Section */}
        {activeSection === 'transfer' && (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
              Transfer Money
            </Typography>
            <Card sx={{ maxWidth: 500 }}>
              <CardContent>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => setTransferDialog(true)}
                  sx={{ py: 2, fontSize: '1.1rem' }}
                >
                  Send Money
                </Button>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Bank Accounts Section */}
        {activeSection === 'banks' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Bank Accounts
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setAddBankDialog(true)}
              >
                Add Bank Account
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              {bankAccounts.map((account) => (
                <Grid item xs={12} md={6} key={account.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {account.bank_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Account: ****{account.account_number.slice(-4)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        IFSC: {account.ifsc}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Holder: {account.account_holder_name}
                      </Typography>
                      {account.is_primary && (
                        <Chip label="Primary" color="primary" size="small" sx={{ mt: 1 }} />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Transactions Section */}
        {activeSection === 'transactions' && (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
              Transaction History
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                        {transaction.transaction_id.slice(0, 8)}...
                      </TableCell>
                      <TableCell>{getTransactionType(transaction)}</TableCell>
                      <TableCell sx={{ color: getAmountColor(transaction), fontWeight: 'bold' }}>
                        {getTransactionAmount(transaction)}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={transaction.status} 
                          color={getStatusColor(transaction.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{formatDate(transaction.created_at)}</TableCell>
                      <TableCell>{transaction.description || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Add Money Section */}
        {activeSection === 'addmoney' && (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
              Add Money to Wallet
            </Typography>
            <Card sx={{ maxWidth: 500 }}>
              <CardContent>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => setAddMoneyDialog(true)}
                  sx={{ py: 2, fontSize: '1.1rem' }}
                >
                  Add Money
                </Button>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>

      {/* Transfer Dialog */}
      <Dialog open={transferDialog} onClose={() => setTransferDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Transfer Money</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Receiver Username"
            value={transferForm.receiver_username}
            onChange={(e) => setTransferForm({...transferForm, receiver_username: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={transferForm.amount}
            onChange={(e) => setTransferForm({...transferForm, amount: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description (Optional)"
            value={transferForm.description}
            onChange={(e) => setTransferForm({...transferForm, description: e.target.value})}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransferDialog(false)}>Cancel</Button>
          <Button onClick={handleTransfer} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Transfer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Bank Dialog */}
      <Dialog open={addBankDialog} onClose={() => setAddBankDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Bank Account</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Account Number"
            value={bankForm.account_number}
            onChange={(e) => setBankForm({...bankForm, account_number: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Bank Name"
            value={bankForm.bank_name}
            onChange={(e) => setBankForm({...bankForm, bank_name: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="IFSC Code"
            value={bankForm.ifsc}
            onChange={(e) => setBankForm({...bankForm, ifsc: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Account Holder Name"
            value={bankForm.account_holder_name}
            onChange={(e) => setBankForm({...bankForm, account_holder_name: e.target.value})}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddBankDialog(false)}>Cancel</Button>
          <Button onClick={handleAddBank} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Add Bank'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Money Dialog */}
      <Dialog open={addMoneyDialog} onClose={() => setAddMoneyDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Money to Wallet</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={addMoneyForm.amount}
            onChange={(e) => setAddMoneyForm({...addMoneyForm, amount: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Bank Account"
            value={addMoneyForm.bank_account_id}
            onChange={(e) => setAddMoneyForm({...addMoneyForm, bank_account_id: e.target.value})}
            margin="normal"
            SelectProps={{ native: true }}
          >
            <option value="">Select Bank Account</option>
            {bankAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.bank_name} - ****{account.account_number.slice(-4)}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddMoneyDialog(false)}>Cancel</Button>
          <Button onClick={handleAddMoney} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Add Money'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
