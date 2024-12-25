import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { fetchUsers, fetchUserPurchases } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import { PurchaseList } from '../purchases/PurchaseList.jsx';