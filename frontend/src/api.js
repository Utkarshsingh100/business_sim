import axios from "axios";

const API_BASE = "https://business-sim-backend.onrender.com/api";

// Business APIs
export const getBusinesses = () => axios.get(`${API_BASE}/businesses`).then(r => r.data);
export const createBusiness = (data) => axios.post(`${API_BASE}/businesses`, data).then(r => r.data);
export const updateBusiness = (id, data) => axios.put(`${API_BASE}/businesses/${id}`, data).then(r => r.data);
export const deleteBusiness = (id) => axios.delete(`${API_BASE}/businesses/${id}`).then(r => r.data);

// Strategy APIs
export const getStrategies = () => axios.get(`${API_BASE}/strategies`).then(r => r.data);
export const createStrategy = (data) => axios.post(`${API_BASE}/strategies`, data).then(r => r.data);
export const updateStrategy = (id, data) => axios.put(`${API_BASE}/strategies/${id}`, data).then(r => r.data);
export const deleteStrategy = (id) => axios.delete(`${API_BASE}/strategies/${id}`).then(r => r.data);

// Simulation APIs
export const runSimulation = (data) => axios.post(`${API_BASE}/simulate`, data).then(r => r.data);
export const getSimulations = () => axios.get(`${API_BASE}/simulations`).then(r => r.data);
// src/api.js
