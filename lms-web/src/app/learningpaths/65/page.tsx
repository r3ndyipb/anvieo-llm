"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlackboxRails from "@/components/BlackboxRails";
import FlatIcon from "@/components/FlatIcon";

interface CourseStep {
  stepNumber: number;
  stepTitle: string;
  stepDesc: string;
  courseName: string;
  courseSlug: string;
  duration: string;
  rating: string;
  level: "Dasar" | "Pemula" | "Menengah" | "Mahir";
  levelBars: number; // 1 to 3
  modules: string;
  students: string;
  highlights: string[];
  description: string;
}

interface StageGroup {
  id: string;
  stageNumber: string;
  title: string;
  level: "Dasar" | "Pemula" | "Menengah" | "Mahir";
  stepRange: string;
  totalHours: string;
  totalModules: string;
  courseCount: number;
  description: string;
  stepNumbers: number[];
}

interface CurriculumTrack {
  id: string;
  anvieoPathId: string;
  title: string;
  category: "ai" | "web" | "mobile" | "cloud";
  categoryLabel: string;
  levelRange: string;
  summary: string;
  totalHours: string;
  courseCount: number;
  totalModules: string;
  rating: string;
  studentsCount: string;
  priceLifetime: string;
  priceNormal: string;
  priceMonthly: string;
  discountPercent: string;
  accreditations: string[];
  stageGroups: StageGroup[];
  courses: CourseStep[];
}

/* ==========================================================================
   AI ENGINEER COURSES & STAGES (DEFAULT ACTIVE GROUP)
   ========================================================================== */
const AI_ENGINEER_COURSES: CourseStep[] = [
  {
    stepNumber: 1,
    stepTitle: "Memahami Dasar AI",
    stepDesc: "Belajar konsep dasar AI, penerapannya di industri, dan dampaknya dalam kehidupan sehari-hari sebagai fondasi awal.",
    courseName: "Belajar Dasar AI",
    courseSlug: "belajar-dasar-ai",
    duration: "10 Jam",
    rating: "4,86",
    level: "Dasar",
    levelBars: 1,
    modules: "39 Modul",
    students: "246.266 Siswa Terdaftar",
    description: "Kelas ini dirancang untuk pemula yang ingin memahami konsep esensial kecerdasan buatan tanpa latar belakang pemrograman yang rumit. Anda akan mempelajari klasifikasi AI (narrow vs general), machine learning vs deep learning, serta tata kelola etika AI.",
    highlights: [
      "Pengenalan Konsep Esensial AI & Machine Learning",
      "Penerapan AI di Sektor Keuangan, Kesehatan & Otomasi",
      "Etika & Regulasi AI (NIST AI RMF & EU AI Act)",
      "Prospek Karir & Roadmap Menjadi AI Engineer",
    ],
  },
  {
    stepNumber: 2,
    stepTitle: "Menguasai Python",
    stepDesc: "Pelajari Python sebagai tools utama AI: sintaks, struktur data, dan library populer untuk pemrograman data dan machine learning.",
    courseName: "Memulai Pemrograman dengan Python",
    courseSlug: "memulai-pemrograman-dengan-python",
    duration: "60 Jam",
    rating: "4,83",
    level: "Dasar",
    levelBars: 1,
    modules: "91 Modul",
    students: "319.870 Siswa Terdaftar",
    description: "Kuasai fondasi pemrograman bahasa Python 3.12 dari nol. Pelajari tipe data, kendali alur logika, fungsi fungsional, manipulasi array multidimensi dengan NumPy, dan transformasi tabel data menggunakan Pandas.",
    highlights: [
      "Sintaks Modern Python 3, Kontrol Alur & List Comprehension",
      "Object-Oriented Programming (OOP) & Error Handling",
      "Komputasi Saintifik dengan NumPy Arrays",
      "Eksplorasi & Wrangling Dataset dengan Pandas",
    ],
  },
  {
    stepNumber: 3,
    stepTitle: "Memulai Machine Learning",
    stepDesc: "Pahami supervised & unsupervised learning serta praktik membangun model sederhana dengan dataset nyata.",
    courseName: "Belajar Machine Learning untuk Pemula",
    courseSlug: "belajar-machine-learning-untuk-pemula",
    duration: "90 Jam",
    rating: "4,86",
    level: "Pemula",
    levelBars: 1,
    modules: "117 Modul",
    students: "290.637 Siswa Terdaftar",
    description: "Langkah ini membimbing Anda membangun model prediktif berbasis machine learning menggunakan Scikit-Learn. Pelajari teknik supervised learning (regresi & klasifikasi), unsupervised clustering, dan evaluasi matriks performa model.",
    highlights: [
      "Supervised Learning: Linear Regression, Logistic Regression & Decision Trees",
      "Unsupervised Learning: K-Means Clustering & Dimensi Reduksi PCA",
      "Evaluasi Model: Precision, Recall, F1-Score & ROC-AUC",
      "Submission Praktik: Klasifikasi Dataset Riil dengan Review Expert",
    ],
  },
  {
    stepNumber: 4,
    stepTitle: "Menguasai Fundamental Deep Learning",
    stepDesc: "Dalami neural networks, backpropagation, serta arsitektur dasar seperti CNN dan RNN.",
    courseName: "Belajar Fundamental Deep Learning",
    courseSlug: "belajar-fundamental-deep-learning",
    duration: "110 Jam",
    rating: "4,88",
    level: "Menengah",
    levelBars: 2,
    modules: "131 Modul",
    students: "25.781 Siswa Terdaftar",
    description: "Pelajari cara kerja jaringan saraf tiruan (artificial neural networks) dari prinsip matematis hingga implementasi praktis menggunakan TensorFlow & Keras. Memahami ekstraksi fitur visual CNN dan data berurutan RNN/LSTM.",
    highlights: [
      "Perceptron, Multi-Layer Perceptrons & Backpropagation Math",
      "Convolutional Neural Network (CNN) untuk Pengolahan Citra Digital",
      "Recurrent Neural Network (RNN) & LSTM untuk Analisis Teks",
      "Submission Praktik: Deteksi Pola Citra Kompleks dengan Standar Akurasi Tinggi",
    ],
  },
  {
    stepNumber: 5,
    stepTitle: "Menerapkan Machine Learning",
    stepDesc: "Belajar mengaplikasikan machine learning pada kasus nyata: preprocessing, evaluasi, hingga deployment sederhana.",
    courseName: "Machine Learning Terapan",
    courseSlug: "machine-learning-terapan",
    duration: "80 Jam",
    rating: "4,87",
    level: "Mahir",
    levelBars: 3,
    modules: "109 Modul",
    students: "9.143 Siswa Terdaftar",
    description: "Pelajari implementasi machine learning end-to-end pada studi kasus nyata skala produksi: sistem rekomendasi (collaborative & content-based filtering), deteksi anomali, hingga pipeline feature engineering otomatis.",
    highlights: [
      "Production Data Preprocessing & Missing Value Imputation",
      "Membangun Recommendation System Skala Industri",
      "Hyperparameter Tuning dengan Optuna & Bayesian Search",
      "Submission: Solusi Predictive Analytics Lengkap dengan Laporan Teknis",
    ],
  },
  {
    stepNumber: 6,
    stepTitle: "Membangun Proyek Deep Learning Mahir",
    stepDesc: "Bangun proyek end-to-end dengan deep learning: mulai dari perancangan, pelatihan, evaluasi, hingga dokumentasi sesuai standar industri.",
    courseName: "Membangun Proyek Deep Learning Tingkat Mahir",
    courseSlug: "membangun-proyek-deep-learning-tingkat-mahir",
    duration: "90 Jam",
    rating: "4,93",
    level: "Mahir",
    levelBars: 3,
    modules: "87 Modul",
    students: "1.824 Siswa Terdaftar",
    description: "Puncak dari alur belajar AI Engineer. Anda akan merancang, melatih, mengoptimasi, dan men-deploy model deep learning mutakhir (arsitektur Transformer, fine-tuning LLM, dan model serving) ke lingkungan cloud.",
    highlights: [
      "Transformer Architecture, Attention Mechanism & Fine-tuning LLM",
      "Model Quantization, Pruning & ONNX Runtime Acceleration",
      "Serving Model REST API menggunakan FastAPI & Container Docker",
      "Submission Capstone: Sistem AI Enterprise-Ready dengan Reviewer Tatap Layar",
    ],
  },
];

const AI_ENGINEER_STAGES: StageGroup[] = [
  {
    id: "dasar",
    stageNumber: "01",
    title: "Fondasi AI & Python",
    level: "Dasar",
    stepRange: "Langkah 1 - 2",
    totalHours: "70 Jam",
    totalModules: "130 Modul",
    courseCount: 2,
    description: "Membangun fondasi komputasi esensial: pemahaman prinsip kecerdasan buatan, etika AI, serta kemahiran sintaks Python modern untuk analisis data.",
    stepNumbers: [1, 2],
  },
  {
    id: "pemula",
    stageNumber: "02",
    title: "Machine Learning Core",
    level: "Pemula",
    stepRange: "Langkah 3",
    totalHours: "90 Jam",
    totalModules: "117 Modul",
    courseCount: 1,
    description: "Penguasaan teknik supervised & unsupervised learning, preprocessing dataset nyata, serta evaluasi metrik performa algoritma Scikit-Learn.",
    stepNumbers: [3],
  },
  {
    id: "menengah",
    stageNumber: "03",
    title: "Deep Learning Engine",
    level: "Menengah",
    stepRange: "Langkah 4",
    totalHours: "110 Jam",
    totalModules: "131 Modul",
    courseCount: 1,
    description: "Memahami artificial neural networks, computer vision dengan Convolutional Neural Network (CNN), dan sequential text RNN/LSTM via TensorFlow.",
    stepNumbers: [4],
  },
  {
    id: "mahir",
    stageNumber: "04",
    title: "Penerapan & Proyek Mahir",
    level: "Mahir",
    stepRange: "Langkah 5 - 6",
    totalHours: "170 Jam",
    totalModules: "196 Modul",
    courseCount: 2,
    description: "Sistem rekomendasi berskala besar, fine-tuning Transformer & LLM, akselerasi ONNX/Docker container, hingga model serving REST API standar industri.",
    stepNumbers: [5, 6],
  },
];

/* Helper to generate realistic stages and courses for other tracks */
function createTrackStages(trackTitle: string, courses: CourseStep[]): StageGroup[] {
  return [
    {
      id: "stage-1",
      stageNumber: "01",
      title: `Fondasi & Prinsip ${trackTitle}`,
      level: "Dasar",
      stepRange: "Langkah 1 - 2",
      totalHours: "60 Jam",
      totalModules: "65 Modul",
      courseCount: Math.min(2, courses.length),
      description: `Membangun fondasi esensial, sintaks inti, dan lingkungan kerja profesional untuk jalur ${trackTitle}.`,
      stepNumbers: courses.slice(0, 2).map((c) => c.stepNumber),
    },
    {
      id: "stage-2",
      stageNumber: "02",
      title: `Penerapan & Praktik Terarah`,
      level: "Menengah",
      stepRange: `Langkah 3 - ${Math.min(4, courses.length)}`,
      totalHours: "90 Jam",
      totalModules: "85 Modul",
      courseCount: Math.max(1, courses.length - 2),
      description: `Mengimplementasikan arsitektur modular, integrasi layanan, pengujian otomatis, dan optimasi performa.`,
      stepNumbers: courses.slice(2, 4).map((c) => c.stepNumber),
    },
    {
      id: "stage-3",
      stageNumber: "03",
      title: `Proyek Capstone Skala Industri`,
      level: "Mahir",
      stepRange: `Langkah ${courses.length}`,
      totalHours: "100 Jam",
      totalModules: "50 Modul",
      courseCount: 1,
      description: `Menyelesaikan proyek capstone produksi end-to-end yang di-review baris-per-baris oleh pakar industri.`,
      stepNumbers: [courses[courses.length - 1].stepNumber],
    },
  ];
}

/* ==========================================================================
   MASTER LIST OF 14 CURRICULUM TRACKS (ANVIEO STANDARD)
   ========================================================================== */
export const ALL_CURRICULUM_TRACKS: CurriculumTrack[] = [
  {
    id: "ai-engineer",
    anvieoPathId: "65",
    title: "AI Engineer",
    category: "ai",
    categoryLabel: "AI & Machine Learning",
    levelRange: "Tingkat Dasar - Mahir",
    summary:
      "Alur belajar komprehensif untuk menjadi seorang AI Engineer profesional. Lulusan dipersiapkan untuk menguasai pengembangan machine learning hingga mahir, serta mampu merancang solusi AI yang efektif.",
    totalHours: "350 Jam",
    courseCount: 6,
    totalModules: "130+ Modul",
    rating: "4.88",
    studentsCount: "600K+",
    priceLifetime: "Rp 1.499.000",
    priceNormal: "Rp 2.500.000",
    priceMonthly: "Rp 250.000 / bln",
    discountPercent: "40%",
    accreditations: ["NIST AI RMF", "IEEE Computer Society", "TensorFlow Certified"],
    stageGroups: AI_ENGINEER_STAGES,
    courses: AI_ENGINEER_COURSES,
  },
  {
    id: "gen-ai-engineer",
    anvieoPathId: "68",
    title: "Gen AI Engineer",
    category: "ai",
    categoryLabel: "AI & Machine Learning",
    levelRange: "Tingkat Menengah - Mahir",
    summary:
      "Kuasai arsitektur model generatif modern, Prompt Engineering tingkat lanjut, RAG (Retrieval-Augmented Generation) berbasis vector database, fine-tuning LLM, dan autonomous multi-agent systems.",
    totalHours: "280 Jam",
    courseCount: 5,
    totalModules: "115+ Modul",
    rating: "4.92",
    studentsCount: "142K+",
    priceLifetime: "Rp 1.699.000",
    priceNormal: "Rp 2.800.000",
    priceMonthly: "Rp 250.000 / bln",
    discountPercent: "39%",
    accreditations: ["NVIDIA Deep Learning", "OpenAI Partner", "LangChain Standard"],
    stageGroups: [],
    courses: [
      {
        stepNumber: 1,
        stepTitle: "Dasar Generative AI & LLM",
        stepDesc: "Memahami arsitektur Transformer, mekanisme attention, dan tokenisasi model bahasa.",
        courseName: "Pengantar Generative AI & Large Language Models",
        courseSlug: "pengantar-gen-ai-llm",
        duration: "25 Jam",
        rating: "4.90",
        level: "Dasar",
        levelBars: 1,
        modules: "32 Modul",
        students: "45.000 Siswa",
        description: "Pelajari bagaimana LLM dilatih, batasan model statistik, dan etika kecerdasan buatan generatif.",
        highlights: ["Transformer Architecture Fundamentals", "Tokenization & Context Window", "Model Hallucination Mitigation"],
      },
      {
        stepNumber: 2,
        stepTitle: "Advanced Prompt Engineering",
        stepDesc: "Teknik rekayasa prompt tingkat lanjut: Few-Shot, Chain-of-Thought, ReAct framework.",
        courseName: "Praktik Prompt Engineering Terapan",
        courseSlug: "praktik-prompt-engineering",
        duration: "40 Jam",
        rating: "4.91",
        level: "Pemula",
        levelBars: 1,
        modules: "42 Modul",
        students: "38.200 Siswa",
        description: "Optimalisasi output model melalui teknik prompt sistemik dan structured outputs (JSON schema).",
        highlights: ["Chain of Thought (CoT)", "Zero-Shot & Few-Shot Prompting", "JSON Schema Structured Generation"],
      },
      {
        stepNumber: 3,
        stepTitle: "RAG Pipeline & Vector DB",
        stepDesc: "Membangun sistem Retrieval-Augmented Generation dengan dense embeddings dan vector indexing.",
        courseName: "Membangun Production RAG dengan pgvector",
        courseSlug: "production-rag-pgvector",
        duration: "75 Jam",
        rating: "4.94",
        level: "Menengah",
        levelBars: 2,
        modules: "54 Modul",
        students: "24.100 Siswa",
        description: "Koneksikan LLM dengan basis data perusahaan menggunakan PostgreSQL pgvector (HNSW) dan hybrid search.",
        highlights: ["Embeddings Math & Chunking Strategy", "PostgreSQL pgvector Indexing", "Reranking dengan Cohere"],
      },
      {
        stepNumber: 4,
        stepTitle: "Fine-Tuning Open Source LLM",
        stepDesc: "Teknik parameter-efficient fine-tuning (LoRA / QLoRA) pada model Llama 3 dan Mistral.",
        courseName: "Fine-Tuning Open-Weights LLM",
        courseSlug: "fine-tuning-open-weights-llm",
        duration: "70 Jam",
        rating: "4.93",
        level: "Mahir",
        levelBars: 3,
        modules: "48 Modul",
        students: "12.800 Siswa",
        description: "Latih model bahasa pada dataset spesifik domain lokal menggunakan adapter LoRA pada GPU cluster.",
        highlights: ["Quantization (4-bit / 8-bit)", "LoRA & QLoRA Adaptation", "Evaluation with Ragas Framework"],
      },
      {
        stepNumber: 5,
        stepTitle: "Autonomous AI Agents",
        stepDesc: "Merancang agen otonom multi-agent dengan tool-use, memory persistent, dan self-reflection.",
        courseName: "Membangun Multi-Agent System Enterprise",
        courseSlug: "multi-agent-system-enterprise",
        duration: "70 Jam",
        rating: "4.95",
        level: "Mahir",
        levelBars: 3,
        modules: "45 Modul",
        students: "8.500 Siswa",
        description: "Capstone proyek: Bangun sistem AI Agent yang mampu mengeksekusi workflow analitik bursa mandiri.",
        highlights: ["Agent Tool-Calling Protocols", "Persistent State & Memory Caching", "Capstone Deployment with FastAPI"],
      },
    ],
  },
  {
    id: "mlops-engineer",
    anvieoPathId: "30",
    title: "MLOps Engineer",
    category: "ai",
    categoryLabel: "AI & Machine Learning",
    levelRange: "Tingkat Menengah - Mahir",
    summary:
      "Jembatani model machine learning dengan operasional produksi. Pelajari CI/CD pipeline untuk data/model, Kubeflow, automated drift detection, model registry, dan skalabilitas serving mikroservis.",
    totalHours: "320 Jam",
    courseCount: 5,
    totalModules: "125+ Modul",
    rating: "4.89",
    studentsCount: "88K+",
    priceLifetime: "Rp 1.599.000",
    priceNormal: "Rp 2.700.000",
    priceMonthly: "Rp 250.000 / bln",
    discountPercent: "40%",
    accreditations: ["Kubeflow Certified", "Linux Foundation", "AWS ML Specialty"],
    stageGroups: [],
    courses: [
      {
        stepNumber: 1,
        stepTitle: "Linux & GitOps untuk AI",
        stepDesc: "Fondasi sistem operasi Linux dan otomatisasi deployment model.",
        courseName: "Linux Administration & GitOps Fundamentals",
        courseSlug: "linux-gitops-ai",
        duration: "40 Jam",
        rating: "4.87",
        level: "Dasar",
        levelBars: 1,
        modules: "38 Modul",
        students: "32.000 Siswa",
        description: "Kuasai administrasi server komputasi AI dan manajemen repositori dengan version control DVC.",
        highlights: ["Shell Scripting", "Data Version Control (DVC)", "Git Workflow"],
      },
      {
        stepNumber: 2,
        stepTitle: "Containerization Model dengan Docker",
        stepDesc: "Kemasan model prediksi ke dalam container ringan dan terisolasi.",
        courseName: "Docker Containerization for ML Serving",
        courseSlug: "docker-containerization-ml",
        duration: "50 Jam",
        rating: "4.88",
        level: "Pemula",
        levelBars: 1,
        modules: "44 Modul",
        students: "28.400 Siswa",
        description: "Optimalisasi image Docker untuk inferensi model berkecepatan tinggi dengan GPU pass-through.",
        highlights: ["Multi-Stage Builds", "NVIDIA Container Toolkit", "Minimalist Image Footprint"],
      },
      {
        stepNumber: 3,
        stepTitle: "Pipeline Orchestration dengan Kubeflow",
        stepDesc: "Otomasi siklus pelatihan ulang dan validasi model terdistribusi.",
        courseName: "Kubeflow Pipelines & Kubernetes Orchestration",
        courseSlug: "kubeflow-pipelines-k8s",
        duration: "80 Jam",
        rating: "4.91",
        level: "Menengah",
        levelBars: 2,
        modules: "52 Modul",
        students: "16.200 Siswa",
        description: "Deploy cluster Kubernetes dan rancang pipeline Kubeflow yang memicu training otomatis saat ada data baru.",
        highlights: ["Kubernetes Cluster Setup", "Kubeflow DAG Pipelines", "Artifact Tracking with MLflow"],
      },
      {
        stepNumber: 4,
        stepTitle: "Model Monitoring & Drift Detection",
        stepDesc: "Deteksi penurunan akurasi model akibat perubahan data di dunia nyata.",
        courseName: "Monitoring & Observability Model Produksi",
        courseSlug: "monitoring-observability-ml",
        duration: "75 Jam",
        rating: "4.90",
        level: "Mahir",
        levelBars: 3,
        modules: "46 Modul",
        students: "11.500 Siswa",
        description: "Implementasikan Evidently AI dan Prometheus untuk memonitor data drift dan concept drift secara real-time.",
        highlights: ["Evidently AI Integration", "Prometheus Metrics", "Automated Retraining Alerts"],
      },
      {
        stepNumber: 5,
        stepTitle: "High-Throughput Model Serving",
        stepDesc: "Serving inferensi ribuan request per detik menggunakan Triton Inference Server.",
        courseName: "Scalable Model Serving Architecture",
        courseSlug: "scalable-model-serving",
        duration: "75 Jam",
        rating: "4.93",
        level: "Mahir",
        levelBars: 3,
        modules: "45 Modul",
        students: "9.300 Siswa",
        description: "Capstone proyek: Bangun sistem serving terdistribusi dengan load balancer dan auto-scaling HPA.",
        highlights: ["Triton Inference Server", "Dynamic Batching", "Auto-scaling HPA in K8s"],
      },
    ],
  },
  {
    id: "data-scientist",
    anvieoPathId: "60",
    title: "Data Scientist",
    category: "ai",
    categoryLabel: "AI & Machine Learning",
    levelRange: "Tingkat Dasar - Mahir",
    summary:
      "Pelajari analisis statistik mendalam, eksplorasi data ilmiah, perancangan model prediktif, evaluasi metrik matematis, dan visualisasi data strategis untuk pengambilan keputusan bisnis.",
    totalHours: "340 Jam",
    courseCount: 6,
    totalModules: "135+ Modul",
    rating: "4.87",
    studentsCount: "380K+",
    priceLifetime: "Rp 1.499.000",
    priceNormal: "Rp 2.500.000",
    priceMonthly: "Rp 250.000 / bln",
    discountPercent: "40%",
    accreditations: ["IEEE Standards", "Python Software Foundation"],
    stageGroups: [],
    courses: [
      {
        stepNumber: 1,
        stepTitle: "Statistika & Probabilitas untuk Data Science",
        stepDesc: "Fondasi matematika: inferensi statistik, distribusi probabilitas, dan uji hipotesis.",
        courseName: "Statistika Terapan untuk Sains Data",
        courseSlug: "statistika-terapan-sains-data",
        duration: "30 Jam",
        rating: "4.85",
        level: "Dasar",
        levelBars: 1,
        modules: "40 Modul",
        students: "95.000 Siswa",
        description: "Pahami logika di balik pengambilan kesimpulan berbasis data acak dan uji signifikansi p-value.",
        highlights: ["Descriptive & Inferential Stats", "Hypothesis Testing (t-test, ANOVA)", "Probability Distributions"],
      },
      {
        stepNumber: 2,
        stepTitle: "Python untuk Data Science",
        stepDesc: "Manipulasi data terstruktur dengan Pandas dan komputasi array NumPy.",
        courseName: "Data Wrangling & Analysis with Python",
        courseSlug: "data-wrangling-python",
        duration: "60 Jam",
        rating: "4.86",
        level: "Dasar",
        levelBars: 1,
        modules: "75 Modul",
        students: "180.000 Siswa",
        description: "Pembersihan missing values, transformasi kolom, aggregating groupby, dan penggabungan dataset masif.",
        highlights: ["Pandas DataFrame Mastery", "NumPy Matrix Operations", "Data Cleaning Techniques"],
      },
      {
        stepNumber: 3,
        stepTitle: "Exploratory Data Analysis (EDA)",
        stepDesc: "Visualisasi pola tersembunyi dan outlier menggunakan Seaborn & Matplotlib.",
        courseName: "Exploratory Data Analysis & Storytelling",
        courseSlug: "eda-data-storytelling",
        duration: "60 Jam",
        rating: "4.88",
        level: "Pemula",
        levelBars: 1,
        modules: "60 Modul",
        students: "85.000 Siswa",
        description: "Menceritakan insight data kepada pemangku kepentingan non-teknis secara efektif dan visual.",
        highlights: ["Multivariate Data Analysis", "Outlier Detection & IQR", "Insight Storytelling"],
      },
      {
        stepNumber: 4,
        stepTitle: "Supervised & Unsupervised Learning",
        stepDesc: "Membangun model klasifikasi, regresi, dan pengelompokan pelanggan (clustering).",
        courseName: "Pemodelan Machine Learning Lanjutan",
        courseSlug: "pemodelan-machine-learning-lanjutan",
        duration: "80 Jam",
        rating: "4.89",
        level: "Menengah",
        levelBars: 2,
        modules: "80 Modul",
        students: "45.000 Siswa",
        description: "Pelajari algoritma Random Forest, XGBoost, LightGBM, serta evaluasi F1-Score dan ROC-AUC.",
        highlights: ["Ensemble Learning (XGBoost/LightGBM)", "Cross Validation Techniques", "Feature Importance Analysis"],
      },
      {
        stepNumber: 5,
        stepTitle: "Feature Engineering & Model Tuning",
        stepDesc: "Optimalisasi fitur untuk meningkatkan akurasi model prediktif pada skala besar.",
        courseName: "Feature Engineering & Hyperparameter Optimization",
        courseSlug: "feature-engineering-tuning",
        duration: "55 Jam",
        rating: "4.90",
        level: "Mahir",
        levelBars: 3,
        modules: "55 Modul",
        students: "22.000 Siswa",
        description: "Teknik target encoding, polynomial features, dan Bayesian hyperparameter tuning dengan Optuna.",
        highlights: ["Feature Selection Strategies", "Optuna Bayesian Search", "Imbalanced Data Handling (SMOTE)"],
      },
      {
        stepNumber: 6,
        stepTitle: "Capstone: Solusi Prediksi Bisnis Enterprise",
        stepDesc: "Menyusun solusi sains data lengkap dengan deployment dashboard interaktif Streamlit.",
        courseName: "Capstone Project Data Science Enterprise",
        courseSlug: "capstone-data-science-enterprise",
        duration: "55 Jam",
        rating: "4.93",
        level: "Mahir",
        levelBars: 3,
        modules: "45 Modul",
        students: "15.000 Siswa",
        description: "Presentasi model prediksi churn pelanggan atau risiko kredit kepada dewan penguji praktisi industri.",
        highlights: ["End-to-End Predictive Pipeline", "Interactive Dashboard with Streamlit", "Business Executive Report"],
      },
    ],
  },
  {
    id: "data-analyst",
    anvieoPathId: "71",
    title: "Data Analyst",
    category: "ai",
    categoryLabel: "AI & Machine Learning",
    levelRange: "Tingkat Dasar - Menengah",
    summary:
      "Kuasai analisis data bisnis dari nol: SQL tingkat lanjut, spreadsheet otomasi, eksplorasi Python, hingga pembuatan dashboard interaktif Tableau & PowerBI untuk mendukung keputusan korporat.",
    totalHours: "240 Jam",
    courseCount: 5,
    totalModules: "98+ Modul",
    rating: "4.85",
    studentsCount: "420K+",
    priceLifetime: "Rp 1.199.000",
    priceNormal: "Rp 2.000.000",
    priceMonthly: "Rp 250.000 / bln",
    discountPercent: "40%",
    accreditations: ["Google Data Analytics", "Tableau Certified Associate"],
    stageGroups: [],
    courses: [
      {
        stepNumber: 1,
        stepTitle: "Pengantar Analisis Data",
        stepDesc: "Prinsip data-driven decision making dan siklus hidup proyek analitik data.",
        courseName: "Belajar Dasar Analisis Data",
        courseSlug: "belajar-dasar-analisis-data",
        duration: "20 Jam",
        rating: "4.84",
        level: "Dasar",
        levelBars: 1,
        modules: "28 Modul",
        students: "120.000 Siswa",
        description: "Memahami peran data analyst, tipe data terstruktur vs tidak terstruktur, dan metrik bisnis inti.",
        highlights: ["Data Life Cycle", "Business Metrics (CAC, LTV, Churn)", "Spreadsheet Data Cleansing"],
      },
      {
        stepNumber: 2,
        stepTitle: "SQL untuk Analisis Data",
        stepDesc: "Querying relasional basis data, agregasi, subquery, dan window functions.",
        courseName: "Penguasaan SQL untuk Bisnis",
        courseSlug: "sql-untuk-bisnis",
        duration: "50 Jam",
        rating: "4.86",
        level: "Dasar",
        levelBars: 1,
        modules: "45 Modul",
        students: "140.000 Siswa",
        description: "Ekstrak informasi relevan dari jutaan baris database PostgreSQL menggunakan SQL queries.",
        highlights: ["JOINs & Subqueries", "Window Functions (RANK, ROW_NUMBER)", "CTE & Performance Query"],
      },
      {
        stepNumber: 3,
        stepTitle: "Analisis Data dengan Python",
        stepDesc: "Otomasi pemrosesan dataset dan analisis tren historis dengan script Python.",
        courseName: "Belajar Analisis Data dengan Python",
        courseSlug: "analisis-data-dengan-python",
        duration: "60 Jam",
        rating: "4.86",
        level: "Pemula",
        levelBars: 1,
        modules: "55 Modul",
        students: "90.000 Siswa",
        description: "Eksplorasi data penjualan menggunakan library Pandas dan visualisasi grafik tren.",
        highlights: ["Data Wrangling with Pandas", "Matplotlib & Seaborn Charts", "Automated Reporting Script"],
      },
      {
        stepNumber: 4,
        stepTitle: "Visualisasi Data & Dashboard",
        stepDesc: "Mendesain dashboard eksekutif yang komunikatif dengan Tableau & PowerBI.",
        courseName: "Business Intelligence & Dashboard Design",
        courseSlug: "bi-dashboard-design",
        duration: "55 Jam",
        rating: "4.88",
        level: "Menengah",
        levelBars: 2,
        modules: "48 Modul",
        students: "45.000 Siswa",
        description: "Rancang KPI dashboard real-time dengan filter interaktif untuk pemantauan performa bisnis.",
        highlights: ["Dashboard UI/UX Principles", "Tableau Calculations & LOD", "PowerBI Data Modeling"],
      },
      {
        stepNumber: 5,
        stepTitle: "Capstone: Analisis Kinerja Bisnis",
        stepDesc: "Menyelesaikan studi kasus analitik nyata dan menyajikan rekomendasi strategis.",
        courseName: "Proyek Akhir Analisis Bisnis Nyata",
        courseSlug: "proyek-akhir-analisis-bisnis",
        duration: "55 Jam",
        rating: "4.90",
        level: "Menengah",
        levelBars: 2,
        modules: "42 Modul",
        students: "25.000 Siswa",
        description: "Presentasi laporan komprehensif yang berisi akar penyebab penurunan retensi pelanggan.",
        highlights: ["Cohort Retention Analysis", "Executive Slide Deck Presentation", "Actionable Recommendations"],
      },
    ],
  },
  {
    id: "frontend-dev",
    anvieoPathId: "22",
    title: "Front-End Web",
    category: "web",
    categoryLabel: "Web & Backend",
    levelRange: "Tingkat Dasar - Menengah",
    summary:
      "Pelajari dasar web modern (HTML5, Semantic CSS, JavaScript ES6+), responsif layout, progressive web apps (PWA), aksesibilitas web (WCAG 2.1), dan optimasi performa Core Web Vitals.",
    totalHours: "290 Jam",
    courseCount: 5,
    totalModules: "110+ Modul",
    rating: "4.86",
    studentsCount: "510K+",
    priceLifetime: "Rp 1.299.000",
    priceNormal: "Rp 2.200.000",
    priceMonthly: "Rp 250.000 / bln",
    discountPercent: "41%",
    accreditations: ["W3C Web Standards", "Google Mobile Web Specialist"],
    stageGroups: [],
    courses: [
      {
        stepNumber: 1,
        stepTitle: "Dasar Pemrograman Web",
        stepDesc: "Fondasi HTML5 semantik, CSS3 styling, dan layout responsif flexbox.",
        courseName: "Belajar Dasar Pemrograman Web",
        courseSlug: "belajar-dasar-pemrograman-web",
        duration: "30 Jam",
        rating: "4.85",
        level: "Dasar",
        levelBars: 1,
        modules: "35 Modul",
        students: "210.000 Siswa",
        description: "Kuasai struktur halaman web modern, tipografi, warna, dan adaptasi tampilan layar mobile.",
        highlights: ["Semantic HTML5", "CSS Flexbox & CSS Grid", "Responsive Design with Media Queries"],
      },
      {
        stepNumber: 2,
        stepTitle: "JavaScript Modern (ES6+)",
        stepDesc: "Kemahiran logika pemrograman: fungsi arrow, async/await, destrukturisasi, dan DOM.",
        courseName: "Belajar Dasar Pemrograman JavaScript",
        courseSlug: "belajar-dasar-javascript",
        duration: "45 Jam",
        rating: "4.86",
        level: "Dasar",
        levelBars: 1,
        modules: "48 Modul",
        students: "190.000 Siswa",
        description: "Memanipulasi elemen DOM dinamis, fetch API eksternal, dan manajemen event browser.",
        highlights: ["ES6 Syntax & Modules", "Asynchronous JavaScript (Promises & async/await)", "DOM Manipulation"],
      },
      {
        stepNumber: 3,
        stepTitle: "Front-End Web untuk Pemula",
        stepDesc: "Membangun interaktivitas kompleks dan Web Storage (localStorage & sessionStorage).",
        courseName: "Belajar Membuat Front-End Web untuk Pemula",
        courseSlug: "frontend-web-pemula",
        duration: "65 Jam",
        rating: "4.87",
        level: "Pemula",
        levelBars: 1,
        modules: "58 Modul",
        students: "90.000 Siswa",
        description: "Bangun aplikasi Bookshelf interaktif dengan penyimpanan data lokal tanpa backend server.",
        highlights: ["Custom Events", "Web Storage API", "Form Validation & Clean Architecture"],
      },
      {
        stepNumber: 4,
        stepTitle: "Front-End Web Tingkat Fundamental",
        stepDesc: "Komponen kustom Web Components, Webpack build tool, dan integrasi REST API.",
        courseName: "Belajar Fundamental Front-End Web Development",
        courseSlug: "fundamental-frontend-web",
        duration: "80 Jam",
        rating: "4.88",
        level: "Menengah",
        levelBars: 2,
        modules: "70 Modul",
        students: "45.000 Siswa",
        description: "Pelajari Custom Elements, Shadow DOM, bundler Webpack, dan optimasi load speed.",
        highlights: ["Web Components (Shadow DOM)", "Webpack Module Bundling", "RESTful API Integration"],
      },
      {
        stepNumber: 5,
        stepTitle: "Front-End Expert & PWA",
        stepDesc: "Progressive Web Apps offline capability, IndexedDB, dan automated testing.",
        courseName: "Menjadi Front-End Web Developer Expert",
        courseSlug: "frontend-web-expert",
        duration: "70 Jam",
        rating: "4.92",
        level: "Mahir",
        levelBars: 3,
        modules: "65 Modul",
        students: "15.000 Siswa",
        description: "Capstone proyek: Bangun aplikasi katalog restoran berskala enterprise yang lulus audit Lighthouse 90+.",
        highlights: ["Progressive Web Apps (Service Workers)", "End-to-End Testing with CodeceptJS", "Lighthouse & Core Web Vitals 95+"],
      },
    ],
  },
  {
    id: "react-dev",
    anvieoPathId: "58",
    title: "React",
    category: "web",
    categoryLabel: "Web & Backend",
    levelRange: "Tingkat Menengah - Mahir",
    summary:
      "Dalami ekosistem React.js modern: Hooks, Context API, Redux Toolkit, Next.js Server-Side Rendering (SSR), arsitektur komponen modular, dan automated testing dengan Jest.",
    totalHours: "270 Jam",
    courseCount: 5,
    totalModules: "105+ Modul",
    rating: "4.90",
    studentsCount: "290K+",
    priceLifetime: "Rp 1.399.000",
    priceNormal: "Rp 2.400.000",
    priceMonthly: "Rp 250.000 / bln",
    discountPercent: "42%",
    accreditations: ["Meta React Certified Partner", "OpenJS Foundation"],
    stageGroups: [],
    courses: [
      {
        stepNumber: 1,
        stepTitle: "Dasar React & JSX",
        stepDesc: "Fondasi komponen fungsional, props, state, dan event handling.",
        courseName: "Belajar Dasar Aplikasi Web dengan React",
        courseSlug: "dasar-aplikasi-web-react",
        duration: "35 Jam",
        rating: "4.88",
        level: "Dasar",
        levelBars: 1,
        modules: "42 Modul",
        students: "90.000 Siswa",
        description: "Kuasai paradigma declarative UI dan rendering siklus hidup komponen React.",
        highlights: ["Functional Components & JSX", "Props & State Management", "Component Composition"],
      },
      {
        stepNumber: 2,
        stepTitle: "React Hooks & Navigasi",
        stepDesc: "Penggunaan useState, useEffect, useMemo, useCallback, dan React Router v6.",
        courseName: "Membuat Aplikasi Web dengan React Hooks",
        courseSlug: "aplikasi-react-hooks",
        duration: "55 Jam",
        rating: "4.89",
        level: "Pemula",
        levelBars: 1,
        modules: "50 Modul",
        students: "65.000 Siswa",
        description: "Kelola side-effects dan optimasi re-render menggunakan hooks bawaan React.",
        highlights: ["Modern React Hooks", "React Router Multi-Page", "Custom Hooks Abstraction"],
      },
      {
        stepNumber: 3,
        stepTitle: "State Management Global (Redux)",
        stepDesc: "Manajemen state aplikasi skala besar dengan Redux Toolkit & RTK Query.",
        courseName: "Pengelolaan State Global dengan Redux Toolkit",
        courseSlug: "state-global-redux-toolkit",
        duration: "65 Jam",
        rating: "4.91",
        level: "Menengah",
        levelBars: 2,
        modules: "58 Modul",
        students: "35.000 Siswa",
        description: "Hindari prop-drilling dan kelola cache asynchronous API secara terpusat.",
        highlights: ["Redux Toolkit (Slices & Store)", "RTK Query Data Fetching", "Middleware & Redux Thunk"],
      },
      {
        stepNumber: 4,
        stepTitle: "Automated Testing & CI",
        stepDesc: "Unit testing, integration testing dengan Jest dan React Testing Library.",
        courseName: "Testing Aplikasi React Standar Enterprise",
        courseSlug: "testing-aplikasi-react",
        duration: "55 Jam",
        rating: "4.92",
        level: "Menengah",
        levelBars: 2,
        modules: "45 Modul",
        students: "22.000 Siswa",
        description: "Tulis unit test terotomasi untuk mencegah regresi bug sebelum rilis produksi.",
        highlights: ["Jest & React Testing Library", "Mocking API Requests (MSW)", "Code Coverage 85%+"],
      },
      {
        stepNumber: 5,
        stepTitle: "Next.js Full-Stack & SSR",
        stepDesc: "Server-Side Rendering, App Router, Server Actions, dan edge caching.",
        courseName: "Membangun Aplikasi Full-Stack dengan Next.js",
        courseSlug: "fullstack-nextjs-app",
        duration: "60 Jam",
        rating: "4.94",
        level: "Mahir",
        levelBars: 3,
        modules: "52 Modul",
        students: "18.000 Siswa",
        description: "Capstone proyek: Bangun forum diskusi interaktif lengkap dengan autentikasi JWT dan SSR cepat.",
        highlights: ["Next.js App Router & Server Components", "Server Actions & Caching Strategies", "Capstone Forum Application"],
      },
    ],
  },
  {
    id: "backend-js",
    anvieoPathId: "41",
    title: "Back-End JavaScript",
    category: "web",
    categoryLabel: "Web & Backend",
    levelRange: "Tingkat Dasar - Mahir",
    summary:
      "Bangun RESTful API performa tinggi dengan Node.js, Hapi / Express, autentikasi JWT, Message Broker (RabbitMQ), caching Redis, dan arsitektur microservices teruji beban.",
    totalHours: "330 Jam",
    courseCount: 6,
    totalModules: "128+ Modul",
    rating: "4.88",
    studentsCount: "340K+",
    priceLifetime: "Rp 1.499.000",
    priceNormal: "Rp 2.500.000",
    priceMonthly: "Rp 250.000 / bln",
    discountPercent: "40%",
    accreditations: ["OpenJS Node.js Certified", "AWS Technical Partner"],
    stageGroups: [],
    courses: [
      {
        stepNumber: 1,
        stepTitle: "Dasar Pemrograman JavaScript",
        stepDesc: "Sintaks modern, kendali alur logika, error handling, dan asynchronous event loop.",
        courseName: "Belajar Dasar JavaScript untuk Backend",
        courseSlug: "dasar-javascript-backend",
        duration: "40 Jam",
        rating: "4.86",
        level: "Dasar",
        levelBars: 1,
        modules: "45 Modul",
        students: "140.000 Siswa",
        description: "Kuasai eksekusi asynchronous, event loop Node.js, dan modularitas CommonJS & ES Module.",
        highlights: ["Node.js Event Loop & Non-blocking I/O", "Asynchronous Error Handling", "Streams & Buffer"],
      },
      {
        stepNumber: 2,
        stepTitle: "Membuat RESTful API dengan Node.js",
        stepDesc: "Routing, request handling, response payload, dan HTTP status code standar.",
        courseName: "Belajar Membuat RESTful API dengan Node.js",
        courseSlug: "restful-api-nodejs",
        duration: "55 Jam",
        rating: "4.87",
        level: "Pemula",
        levelBars: 1,
        modules: "52 Modul",
        students: "95.000 Siswa",
        description: "Bangun Bookshelf API dari nol menggunakan framework Hapi dengan pengujian otomatis Postman.",
        highlights: ["Hapi.js Web Server", "RESTful Architecture Constraints", "Automated Postman Collection Testing"],
      },
      {
        stepNumber: 3,
        stepTitle: "Basis Data Relasional & PostgreSQL",
        stepDesc: "Desain skema 3NF, query SQL relasional, transaksi atomik, dan connection pooling.",
        courseName: "Manajemen Database PostgreSQL Tingkat Lanjut",
        courseSlug: "postgresql-tingkat-lanjut",
        duration: "60 Jam",
        rating: "4.89",
        level: "Menengah",
        levelBars: 2,
        modules: "58 Modul",
        students: "45.000 Siswa",
        description: "Kelola transaksi pembayaran aman dengan ACID compliance dan mitigasi race condition.",
        highlights: ["Relational Schema Normalization (3NF)", "ACID Transactions & Row Locking", "pgBouncer & Connection Pooling"],
      },
      {
        stepNumber: 4,
        stepTitle: "Autentikasi & Otorisasi Kriptografis",
        stepDesc: "Implementasi Access Token & Refresh Token berbasis JSON Web Token (JWT) aman.",
        courseName: "Keamanan Backend & Autentikasi JWT",
        courseSlug: "keamanan-backend-jwt",
        duration: "55 Jam",
        rating: "4.90",
        level: "Menengah",
        levelBars: 2,
        modules: "50 Modul",
        students: "32.000 Siswa",
        description: "Amankan endpoint sensitif menggunakan RBAC (Role-Based Access Control) dan hashing bcrypt.",
        highlights: ["JWT Sign & Verify Workflow", "Token Invalidation with Redis", "Password Hashing with Bcrypt"],
      },
      {
        stepNumber: 5,
        stepTitle: "Message Broker & Caching Terdistribusi",
        stepDesc: "Pemisahan beban kerja berat menggunakan RabbitMQ queue dan cache in-memory Redis.",
        courseName: "Skalabilitas Backend dengan RabbitMQ & Redis",
        courseSlug: "skalabilitas-rabbitmq-redis",
        duration: "60 Jam",
        rating: "4.92",
        level: "Mahir",
        levelBars: 3,
        modules: "55 Modul",
        students: "18.000 Siswa",
        description: "Kirim email invoice asinkron tanpa memblokir request pengguna saat checkout belanja.",
        highlights: ["RabbitMQ Exchange & Worker Queues", "Redis Caching & TTL Expiration", "Idempotency Key Verification"],
      },
      {
        stepNumber: 6,
        stepTitle: "Capstone: OpenMusic API Enterprise",
        stepDesc: "Membangun arsitektur microservices teruji beban dengan rate-limiter dan logging.",
        courseName: "Proyek Akhir Back-End Developer Expert",
        courseSlug: "proyek-akhir-backend-expert",
        duration: "60 Jam",
        rating: "4.95",
        level: "Mahir",
        levelBars: 3,
        modules: "48 Modul",
        students: "12.000 Siswa",
        description: "Capstone proyek: Sistem streaming musik multi-fitur lengkap dengan ekspor lagu terenkripsi.",
        highlights: ["Microservices Architecture", "k6 Load Testing Verification", "Comprehensive Code Review"],
      },
    ],
  },
  {
    id: "backend-python",
    anvieoPathId: "62",
    title: "Back-End Python",
    category: "web",
    categoryLabel: "Web & Backend",
    levelRange: "Tingkat Dasar - Mahir",
    summary:
      "Kuasai rekayasa backend dengan Python, FastAPI, Django, asynchronous I/O, koneksi basis data relasional PostgreSQL dengan SQLAlchemy, serta integrasi queue Celery.",
    totalHours: "310 Jam",
    courseCount: 5,
    totalModules: "120+ Modul",
    rating: "4.87",
    studentsCount: "210K+",
    priceLifetime: "Rp 1.399.000",
    priceNormal: "Rp 2.400.000",
    priceMonthly: "Rp 250.000 / bln",
    discountPercent: "42%",
    accreditations: ["Python Software Foundation", "FastAPI Framework Standard"],
    stageGroups: [],
    courses: [
      {
        stepNumber: 1,
        stepTitle: "Sintaks Python untuk Backend",
        stepDesc: "Struktur data native, fungsi generator, decorator, dan manajemen memori.",
        courseName: "Python Core for Backend Engineers",
        courseSlug: "python-core-backend",
        duration: "45 Jam",
        rating: "4.85",
        level: "Dasar",
        levelBars: 1,
        modules: "48 Modul",
        students: "85.000 Siswa",
        description: "Fondasi pemrograman Python berorientasi objek yang modular dan bersih.",
        highlights: ["OOP Principles in Python", "Generators & Iterators", "Custom Decorators & Context Managers"],
      },
      {
        stepNumber: 2,
        stepTitle: "FastAPI & Async I/O",
        stepDesc: "Membangun REST API berkecepatan tinggi dengan validasi Pydantic otomatis.",
        courseName: "Membangun API Modern dengan FastAPI",
        courseSlug: "api-modern-fastapi",
        duration: "65 Jam",
        rating: "4.89",
        level: "Pemula",
        levelBars: 1,
        modules: "58 Modul",
        students: "60.000 Siswa",
        description: "Manfaatkan asynchronous event loop Python untuk melayani ribuan request I/O bound.",
        highlights: ["Asynchronous Def & Await", "Pydantic Schemas & Auto-Docs OpenAPI", "Dependency Injection System"],
      },
      {
        stepNumber: 3,
        stepTitle: "ORM SQLAlchemy & PostgreSQL",
        stepDesc: "Relasi data, migrasi skema database Alembic, dan optimasi query.",
        courseName: "Database Modeling with SQLAlchemy & Alembic",
        courseSlug: "database-modeling-sqlalchemy",
        duration: "65 Jam",
        rating: "4.88",
        level: "Menengah",
        levelBars: 2,
        modules: "60 Modul",
        students: "35.000 Siswa",
        description: "Tulis kueri basis data type-safe dan kelola migrasi skema versi secara terstruktur.",
        highlights: ["Async SQLAlchemy Engine", "Alembic Database Migrations", "N+1 Problem Prevention with Eager Loading"],
      },
      {
        stepNumber: 4,
        stepTitle: "Background Tasks dengan Celery",
        stepDesc: "Eksekusi komputasi berat di luar request-response cycle via Celery & Redis.",
        courseName: "Asynchronous Background Jobs with Celery",
        courseSlug: "celery-background-jobs",
        duration: "65 Jam",
        rating: "4.90",
        level: "Menengah",
        levelBars: 2,
        modules: "52 Modul",
        students: "20.000 Siswa",
        description: "Jadwalkan cron jobs, pemrosesan laporan PDF otomatis, dan pengiriman notifikasi email.",
        highlights: ["Celery Worker & Beat Scheduler", "Redis as Message Broker", "Task Retry Policies & Dead Letter Queues"],
      },
      {
        stepNumber: 5,
        stepTitle: "Capstone: Enterprise FinTech Engine",
        stepDesc: "Arsitektur backend sistem dompet digital dengan transaksi atomik dan audit trail.",
        courseName: "Capstone Project Python Backend Enterprise",
        courseSlug: "capstone-python-backend",
        duration: "70 Jam",
        rating: "4.93",
        level: "Mahir",
        levelBars: 3,
        modules: "50 Modul",
        students: "12.000 Siswa",
        description: "Selesaikan proyek backend dompet digital lengkap dengan simulasi transfer dana konkuren.",
        highlights: ["Atomic Concurrency Control", "SHA-256 Audit Logging", "Docker Compose Orchestration"],
      },
    ],
  },
  {
    id: "android-dev",
    anvieoPathId: "7",
    title: "Android",
    category: "mobile",
    categoryLabel: "Mobile & Multiplatform",
    levelRange: "Tingkat Dasar - Mahir",
    summary:
      "Menjadi Android Engineer profesional bersertifikat Google Associate Android Developer. Kuasai Kotlin, Jetpack Compose, Coroutines/Flow, Clean Architecture, dan Room DB.",
    totalHours: "380 Jam",
    courseCount: 6,
    totalModules: "150+ Modul",
    rating: "4.89",
    studentsCount: "470K+",
    priceLifetime: "Rp 1.599.000",
    priceNormal: "Rp 2.700.000",
    priceMonthly: "Rp 250.000 / bln",
    discountPercent: "41%",
    accreditations: ["Google Associate Android Developer", "Android Authorized Training"],
    stageGroups: [],
    courses: [
      {
        stepNumber: 1,
        stepTitle: "Dasar Pemrograman Kotlin",
        stepDesc: "Sintaks modern bahasa Kotlin, null safety, collections, dan functional programming.",
        courseName: "Memulai Pemrograman dengan Kotlin",
        courseSlug: "memulai-pemrograman-kotlin",
        duration: "50 Jam",
        rating: "4.87",
        level: "Dasar",
        levelBars: 1,
        modules: "65 Modul",
        students: "220.000 Siswa",
        description: "Bahasa resmi Android dari Google yang ringkas, aman, dan kompatibel penuh dengan Java.",
        highlights: ["Kotlin Null Safety", "Data Classes & Sealed Interfaces", "Lambdas & Higher-Order Functions"],
      },
      {
        stepNumber: 2,
        stepTitle: "Dasar Aplikasi Android",
        stepDesc: "Komponen dasar Android: Activity, Intent, Fragment, dan arsitektur siklus hidup.",
        courseName: "Belajar Membuat Aplikasi Android untuk Pemula",
        courseSlug: "aplikasi-android-pemula",
        duration: "60 Jam",
        rating: "4.88",
        level: "Dasar",
        levelBars: 1,
        modules: "75 Modul",
        students: "180.000 Siswa",
        description: "Rancang aplikasi mobile interaktif pertama Anda menggunakan Android Studio dan XML layout.",
        highlights: ["Activity & Fragment Lifecycle", "Explicit & Implicit Intent", "RecyclerView List Optimization"],
      },
      {
        stepNumber: 3,
        stepTitle: "Jetpack Compose & Navigasi",
        stepDesc: "Membangun antarmuka modern deklaratif menggunakan toolkit Jetpack Compose.",
        courseName: "Modern Android UI with Jetpack Compose",
        courseSlug: "jetpack-compose-modern-ui",
        duration: "65 Jam",
        rating: "4.91",
        level: "Pemula",
        levelBars: 1,
        modules: "68 Modul",
        students: "75.000 Siswa",
        description: "Tinggalkan XML dan bangun UI responsif dengan kode Kotlin deklaratif yang rapi.",
        highlights: ["Composable Functions & Modifiers", "State Hoisting & Recomposition", "Navigation Compose"],
      },
      {
        stepNumber: 4,
        stepTitle: "Fundamental Arsitektur Android",
        stepDesc: "Penerapan ViewModel, LiveData, Coroutines, Flow, dan networking Retrofit.",
        courseName: "Belajar Fundamental Aplikasi Android",
        courseSlug: "fundamental-aplikasi-android",
        duration: "75 Jam",
        rating: "4.89",
        level: "Menengah",
        levelBars: 2,
        modules: "85 Modul",
        students: "50.000 Siswa",
        description: "Pisahkan logika bisnis dari antarmuka pengguna dengan Android Architecture Components.",
        highlights: ["MVVM Architecture Pattern", "Kotlin Coroutines & Flow", "Retrofit REST Client Integration"],
      },
      {
        stepNumber: 5,
        stepTitle: "Penyimpanan Lokal & Offline-First",
        stepDesc: "Manajemen basis data SQLite menggunakan library Room dan sinkronisasi WorkManager.",
        courseName: "Local Persistence with Room & WorkManager",
        courseSlug: "room-workmanager-persistence",
        duration: "65 Jam",
        rating: "4.90",
        level: "Menengah",
        levelBars: 2,
        modules: "72 Modul",
        students: "30.000 Siswa",
        description: "Buat aplikasi yang tetap berfungsi mulus tanpa koneksi internet dengan caching database lokal.",
        highlights: ["Room Database DAO & Entities", "DataStore Preferences", "WorkManager Background Tasks"],
      },
      {
        stepNumber: 6,
        stepTitle: "Android Expert: Clean Architecture",
        stepDesc: "Dependency Injection Hilt, Modularization, Clean Architecture, dan CI/CD rilis Play Store.",
        courseName: "Menjadi Android Developer Expert",
        courseSlug: "android-developer-expert",
        duration: "65 Jam",
        rating: "4.94",
        level: "Mahir",
        levelBars: 3,
        modules: "65 Modul",
        students: "16.000 Siswa",
        description: "Capstone proyek: Bangun aplikasi berita berskala enterprise dengan modul multi-feature terisolasi.",
        highlights: ["Clean Architecture (Data, Domain, Presentation)", "Dependency Injection with Hilt", "Multi-Module Architecture"],
      },
    ],
  },
  {
    id: "multiplatform-dev",
    anvieoPathId: "21",
    title: "Multi-Platform App",
    category: "mobile",
    categoryLabel: "Mobile & Multiplatform",
    levelRange: "Tingkat Dasar - Mahir",
    summary:
      "Kembangkan aplikasi multiplatform (Android, iOS, Web, Desktop) dari satu basis kode menggunakan Flutter & Dart. Kuasai State Management BLoC, animasi, dan integrasi backend API.",
    totalHours: "300 Jam",
    courseCount: 5,
    totalModules: "118+ Modul",
    rating: "4.88",
    studentsCount: "280K+",
    priceLifetime: "Rp 1.399.000",
    priceNormal: "Rp 2.400.000",
    priceMonthly: "Rp 250.000 / bln",
    discountPercent: "42%",
    accreditations: ["Google Flutter Authorized", "Dart Language Standard"],
    stageGroups: [],
    courses: [
      {
        stepNumber: 1,
        stepTitle: "Dasar Pemrograman Dart",
        stepDesc: "Sintaks modern bahasa Dart, OOP, null safety, dan asynchronous programming.",
        courseName: "Memulai Pemrograman dengan Dart",
        courseSlug: "pemrograman-dart-dasar",
        duration: "35 Jam",
        rating: "4.86",
        level: "Dasar",
        levelBars: 1,
        modules: "42 Modul",
        students: "110.000 Siswa",
        description: "Bahasa pemrograman di balik framework Flutter dengan kompilasi ahead-of-time (AOT) cepat.",
        highlights: ["Dart Type System & Null Safety", "Object-Oriented Programming in Dart", "Futures, Streams & async/await"],
      },
      {
        stepNumber: 2,
        stepTitle: "Dasar Aplikasi Flutter",
        stepDesc: "Mengenal widget pohon (widget tree), layout dasar, dan interaksi sentuhan.",
        courseName: "Belajar Membuat Aplikasi Flutter untuk Pemula",
        courseSlug: "flutter-untuk-pemula",
        duration: "60 Jam",
        rating: "4.87",
        level: "Dasar",
        levelBars: 1,
        modules: "65 Modul",
        students: "90.000 Siswa",
        description: "Bangun aplikasi pariwisata multi-layar dengan tampilan natif indah di Android dan iOS.",
        highlights: ["Stateless vs Stateful Widgets", "Scaffold & Material / Cupertino Design", "Responsive Layout Builder"],
      },
      {
        stepNumber: 3,
        stepTitle: "State Management & Provider",
        stepDesc: "Manajemen state aplikasi terukur dengan Provider dan navigasi deklaratif GoRouter.",
        courseName: "State Management Flutter with Provider",
        courseSlug: "state-management-provider",
        duration: "65 Jam",
        rating: "4.89",
        level: "Pemula",
        levelBars: 1,
        modules: "60 Modul",
        students: "50.000 Siswa",
        description: "Kelola data cart belanja dan preferensi pengguna tanpa re-rendering berlebihan.",
        highlights: ["Provider & ChangeNotifier Pattern", "GoRouter Navigation 2.0", "HTTP Client Networking"],
      },
      {
        stepNumber: 4,
        stepTitle: "Flutter Fundamental & BLoC Pattern",
        stepDesc: "Pemisahan presentasi dan event logika bisnis menggunakan BLoC & Cubit.",
        courseName: "Belajar Fundamental Aplikasi Flutter",
        courseSlug: "fundamental-aplikasi-flutter",
        duration: "70 Jam",
        rating: "4.91",
        level: "Menengah",
        levelBars: 2,
        modules: "68 Modul",
        students: "30.000 Siswa",
        description: "Arsitektur standar industri perbankan dan e-commerce global untuk aplikasi Flutter.",
        highlights: ["BLoC (Business Logic Component) Architecture", "Local Database with Sqflite", "Notification & Background Services"],
      },
      {
        stepNumber: 5,
        stepTitle: "Menjadi Flutter Developer Expert",
        stepDesc: "Clean Architecture, Continuous Integration, Automated Testing, dan deployment toko aplikasi.",
        courseName: "Menjadi Flutter Developer Expert",
        courseSlug: "flutter-developer-expert",
        duration: "70 Jam",
        rating: "4.93",
        level: "Mahir",
        levelBars: 3,
        modules: "60 Modul",
        students: "15.000 Siswa",
        description: "Capstone proyek: Bangun aplikasi streaming film multiplatform dengan skor performa 60 FPS stabil.",
        highlights: ["Clean Architecture Implementation", "Unit, Widget & Integration Testing", "CI/CD Deployment with GitHub Actions"],
      },
    ],
  },
  {
    id: "ios-dev",
    anvieoPathId: "9",
    title: "iOS",
    category: "mobile",
    categoryLabel: "Mobile & Multiplatform",
    levelRange: "Tingkat Dasar - Mahir",
    summary:
      "Pelajari ekosistem iOS native dari dasar hingga mahir: bahasa pemrograman Swift, declarative UI dengan SwiftUI, CoreData, concurrency async/await, dan rilis App Store.",
    totalHours: "340 Jam",
    courseCount: 5,
    totalModules: "130+ Modul",
    rating: "4.91",
    studentsCount: "120K+",
    priceLifetime: "Rp 1.599.000",
    priceNormal: "Rp 2.800.000",
    priceMonthly: "Rp 250.000 / bln",
    discountPercent: "43%",
    accreditations: ["Apple Developer Ecosystem", "Swift Standard Library"],
    stageGroups: [],
    courses: [
      {
        stepNumber: 1,
        stepTitle: "Dasar Pemrograman Swift",
        stepDesc: "Sintaks modern bahasa Swift 5.10, optionals, closures, enums, dan protocol-oriented programming.",
        courseName: "Memulai Pemrograman dengan Swift",
        courseSlug: "pemrograman-swift-dasar",
        duration: "45 Jam",
        rating: "4.89",
        level: "Dasar",
        levelBars: 1,
        modules: "50 Modul",
        students: "65.000 Siswa",
        description: "Fondasi bahasa resmi ekosistem Apple yang ekspresif, aman, dan berkecepatan tinggi.",
        highlights: ["Swift Optionals & Unwrapping", "Protocol-Oriented Programming (POP)", "Closures & Memory Management (ARC)"],
      },
      {
        stepNumber: 2,
        stepTitle: "Dasar Aplikasi iOS",
        stepDesc: "Mengenal Xcode IDE, UIKit, AutoLayout, Storyboard, dan siklus hidup UIViewController.",
        courseName: "Belajar Membuat Aplikasi iOS untuk Pemula",
        courseSlug: "aplikasi-ios-pemula",
        duration: "65 Jam",
        rating: "4.89",
        level: "Dasar",
        levelBars: 1,
        modules: "65 Modul",
        students: "45.000 Siswa",
        description: "Rancang aplikasi iOS fungsional pertama Anda yang berjalan mulus di iPhone simulator.",
        highlights: ["Xcode Environment & Instruments", "UIKit & AutoLayout Constraints", "Table View & Collection View"],
      },
      {
        stepNumber: 3,
        stepTitle: "Modern UI dengan SwiftUI",
        stepDesc: "Antarmuka deklaratif mutakhir Apple: State, Binding, ObservableObject, dan animasi.",
        courseName: "Declarative UI with SwiftUI",
        courseSlug: "declarative-ui-swiftui",
        duration: "75 Jam",
        rating: "4.92",
        level: "Pemula",
        levelBars: 1,
        modules: "75 Modul",
        students: "30.000 Siswa",
        description: "Bangun UI interaktif dengan baris kode minimal dan live preview real-time.",
        highlights: ["SwiftUI Views & Modifiers", "@State, @Binding & @EnvironmentObject", "Fluid Spring Animations"],
      },
      {
        stepNumber: 4,
        stepTitle: "Fundamental iOS: Networking & CoreData",
        stepDesc: "Networking URLSession modern dengan async/await dan persistensi data CoreData.",
        courseName: "Belajar Fundamental Aplikasi iOS",
        courseSlug: "fundamental-aplikasi-ios",
        duration: "80 Jam",
        rating: "4.92",
        level: "Menengah",
        levelBars: 2,
        modules: "80 Modul",
        students: "18.000 Siswa",
        description: "Integrasikan aplikasi dengan REST API eksternal dan simpan data secara offline.",
        highlights: ["Swift Concurrency (async/await, Actor)", "URLSession & Codable Parsing", "CoreData Persistent Storage"],
      },
      {
        stepNumber: 5,
        stepTitle: "Menjadi iOS Developer Expert",
        stepDesc: "Clean Architecture (VIPER/MVVM), Modularization SPM, Unit Testing, dan rilis App Store.",
        courseName: "Menjadi iOS Developer Expert",
        courseSlug: "ios-developer-expert",
        duration: "75 Jam",
        rating: "4.95",
        level: "Mahir",
        levelBars: 3,
        modules: "60 Modul",
        students: "9.500 Siswa",
        description: "Capstone proyek: Bangun aplikasi streaming multimedia enterprise yang siap diajukan ke App Store.",
        highlights: ["VIPER & Clean Architecture", "Swift Package Manager (SPM) Modules", "XCTest Unit Testing & Code Coverage"],
      },
    ],
  },
  {
    id: "devops-engineer",
    anvieoPathId: "53",
    title: "DevOps Engineer",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    levelRange: "Tingkat Menengah - Mahir",
    summary:
      "Otomasi siklus rilis perangkat lunak enterprise: Linux system administration, containerization Docker, orkestrasi Kubernetes, CI/CD pipeline, dan monitoring Prometheus/Grafana.",
    totalHours: "350 Jam",
    courseCount: 6,
    totalModules: "140+ Modul",
    rating: "4.90",
    studentsCount: "195K+",
    priceLifetime: "Rp 1.699.000",
    priceNormal: "Rp 2.900.000",
    priceMonthly: "Rp 250.000 / bln",
    discountPercent: "41%",
    accreditations: ["Cloud Native Computing Foundation (CNCF)", "Linux Professional Institute"],
    stageGroups: [],
    courses: [
      {
        stepNumber: 1,
        stepTitle: "Linux Administration & Bash",
        stepDesc: "Fondasi sistem operasi Linux: manajemen proses, perizinan file, networking, dan shell script.",
        courseName: "Linux System Administration Fundamentals",
        courseSlug: "linux-sysadmin-fundamentals",
        duration: "45 Jam",
        rating: "4.88",
        level: "Dasar",
        levelBars: 1,
        modules: "48 Modul",
        students: "75.000 Siswa",
        description: "Kelola server Ubuntu/Debian di cloud terminal dengan perintah bash terotomasi.",
        highlights: ["Linux File Hierarchy & Permissions", "Systemd Services & Cron Scheduling", "SSH Key Management & Firewall (UFW)"],
      },
      {
        stepNumber: 2,
        stepTitle: "Containerization dengan Docker",
        stepDesc: "Packaging aplikasi ke dalam image Docker, multi-stage builds, dan Docker Compose.",
        courseName: "Docker Containerization Mastery",
        courseSlug: "docker-containerization-mastery",
        duration: "55 Jam",
        rating: "4.90",
        level: "Pemula",
        levelBars: 1,
        modules: "55 Modul",
        students: "65.000 Siswa",
        description: "Standarisasi lingkungan rilis lokal dan staging agar terbebas dari masalah 'works on my machine'.",
        highlights: ["Dockerfile Multi-stage Optimization", "Docker Compose Multi-container Networking", "Volume Data Persistence"],
      },
      {
        stepNumber: 3,
        stepTitle: "CI/CD Pipeline dengan GitHub Actions",
        stepDesc: "Otomatisasi pengujian kode, linting, build image, dan rilis ke registry terpusat.",
        courseName: "Automated CI/CD with GitHub Actions",
        courseSlug: "automated-cicd-github-actions",
        duration: "60 Jam",
        rating: "4.91",
        level: "Menengah",
        levelBars: 2,
        modules: "60 Modul",
        students: "40.000 Siswa",
        description: "Buat pipeline integrasi berkelanjutan yang menguji setiap pull request sebelum di-merge.",
        highlights: ["Workflow YAML Syntax & Triggers", "Self-Hosted Runners & Secrets", "Automated Image Push to GHCR/DockerHub"],
      },
      {
        stepNumber: 4,
        stepTitle: "Orkestrasi dengan Kubernetes (K8s)",
        stepDesc: "Manajemen cluster kontainer: Pods, Deployments, Services, Ingress, dan ConfigMaps.",
        courseName: "Kubernetes Cluster Orchestration in Production",
        courseSlug: "k8s-cluster-orchestration",
        duration: "75 Jam",
        rating: "4.93",
        level: "Menengah",
        levelBars: 2,
        modules: "70 Modul",
        students: "25.000 Siswa",
        description: "Deploy aplikasi mikroservis dengan auto-scaling otomatis saat lonjakan traffic mendadak.",
        highlights: ["Pods, Deployments & ReplicaSets", "Ingress Controller & TLS Certificates", "Horizontal Pod Autoscaler (HPA)"],
      },
      {
        stepNumber: 5,
        stepTitle: "Infrastructure as Code (Terraform)",
        stepDesc: "Penyediaan infrastruktur cloud secara deklaratif menggunakan HashiCorp Terraform.",
        courseName: "Infrastructure as Code with Terraform",
        courseSlug: "iac-terraform-mastery",
        duration: "55 Jam",
        rating: "4.91",
        level: "Mahir",
        levelBars: 3,
        modules: "50 Modul",
        students: "18.000 Siswa",
        description: "Bangun VPC, subnet, load balancer, dan database instance di cloud hanya dengan file konfigurasi.",
        highlights: ["HCL (HashiCorp Configuration Language)", "State Locking with S3 & DynamoDB", "Reusable Terraform Modules"],
      },
      {
        stepNumber: 6,
        stepTitle: "Observabilitas: Prometheus & Grafana",
        stepDesc: "Monitoring metrik server, pelacakan log terpusat, dan peringatan darurat insiden.",
        courseName: "Observability, Logging & Alerting",
        courseSlug: "observability-logging-alerting",
        duration: "60 Jam",
        rating: "4.94",
        level: "Mahir",
        levelBars: 3,
        modules: "55 Modul",
        students: "14.000 Siswa",
        description: "Capstone proyek: Bangun sistem monitoring real-time dengan dashboard Grafana visual 60 FPS.",
        highlights: ["Prometheus Metrics Scraping", "Grafana Visualization Dashboards", "PagerDuty & Telegram Alert Integrations"],
      },
    ],
  },
  {
    id: "google-cloud",
    anvieoPathId: "52",
    title: "Google Cloud Professional",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    levelRange: "Tingkat Menengah - Mahir",
    summary:
      "Kuasai arsitektur cloud enterprise Google Cloud Platform (GCP). Persiapkan diri menghadapi ujian sertifikasi resmi Google Associate Cloud Engineer dan Cloud Architect.",
    totalHours: "260 Jam",
    courseCount: 4,
    totalModules: "95+ Modul",
    rating: "4.89",
    studentsCount: "160K+",
    priceLifetime: "Rp 1.499.000",
    priceNormal: "Rp 2.500.000",
    priceMonthly: "Rp 250.000 / bln",
    discountPercent: "40%",
    accreditations: ["Google Cloud Certified Associate", "Google Cloud Partner Ecosystem"],
    stageGroups: [],
    courses: [
      {
        stepNumber: 1,
        stepTitle: "Dasar Google Cloud Platform",
        stepDesc: "Mengenal console GCP, IAM roles, Cloud Storage, dan Compute Engine VM.",
        courseName: "Belajar Dasar Google Cloud Platform",
        courseSlug: "belajar-dasar-gcp",
        duration: "40 Jam",
        rating: "4.87",
        level: "Dasar",
        levelBars: 1,
        modules: "42 Modul",
        students: "90.000 Siswa",
        description: "Fondasi navigasi infrastruktur cloud Google dengan konfigurasi gcloud CLI terotomasi.",
        highlights: ["GCP Projects & IAM Access Control", "Compute Engine Virtual Machines", "Cloud Storage Buckets & Policies"],
      },
      {
        stepNumber: 2,
        stepTitle: "Serverless & Cloud Run",
        stepDesc: "Deploy container microservices tanpa memikirkan manajemen server via Cloud Run.",
        courseName: "Serverless Computing with Google Cloud Run",
        courseSlug: "serverless-cloud-run",
        duration: "65 Jam",
        rating: "4.90",
        level: "Pemula",
        levelBars: 1,
        modules: "55 Modul",
        students: "50.000 Siswa",
        description: "Skalabilitas otomatis dari 0 hingga ribuan instans dengan penagihan per milidetik eksekusi.",
        highlights: ["Cloud Run Microservices", "Cloud Functions Event Triggers", "Secret Manager Integration"],
      },
      {
        stepNumber: 3,
        stepTitle: "Google Kubernetes Engine (GKE)",
        stepDesc: "Orkestrasi Kubernetes enterprise-grade dengan Autopilot cluster terkelola.",
        courseName: "GKE Autopilot & Networking Architecture",
        courseSlug: "gke-autopilot-networking",
        duration: "75 Jam",
        rating: "4.92",
        level: "Menengah",
        levelBars: 2,
        modules: "65 Modul",
        students: "30.000 Siswa",
        description: "Rancang jaringan Virtual Private Cloud (VPC) multi-region dengan Cloud Armor DDoS protection.",
        highlights: ["GKE Cluster Administration", "Cloud Armor Security WAF", "Cloud SQL High Availability"],
      },
      {
        stepNumber: 4,
        stepTitle: "Capstone: Cloud Architecture Review",
        stepDesc: "Audit arsitektur sistem enterprise sesuai Well-Architected Framework Google Cloud.",
        courseName: "Google Cloud Associate Engineer Certification Prep",
        courseSlug: "gcp-associate-engineer-prep",
        duration: "80 Jam",
        rating: "4.94",
        level: "Mahir",
        levelBars: 3,
        modules: "60 Modul",
        students: "22.000 Siswa",
        description: "Simulasi ujian sertifikasi resmi Google Associate Cloud Engineer dengan studi kasus nyata.",
        highlights: ["Disaster Recovery & Backup Strategy", "Cost Optimization & FinOps", "Full Mock Certification Exam"],
      },
    ],
  },
];

/* Populate stageGroups for tracks that use createTrackStages */
ALL_CURRICULUM_TRACKS.forEach((track) => {
  if (track.stageGroups.length === 0) {
    track.stageGroups = createTrackStages(track.title, track.courses);
  }
});

/* Alumni Testimonials */
const ALUMNI_DATA = [
  {
    name: "Pravasta Caraka Bramastagiri",
    company: "PT. Tokopedia",
    role: "AI Research Engineer",
    avatar: "/alumni/alumni_1.jpg",
  },
  {
    name: "Purbayana",
    company: "PT Indosat Ooredoo Tbk",
    role: "Lead Machine Learning",
    avatar: "/alumni/alumni_2.jpg",
  },
  {
    name: "Hafiza Aprilia",
    company: "Bandung Techno Park",
    role: "Computer Vision Specialist",
    avatar: "/alumni/alumni_3.jpg",
  },
  {
    name: "Rian Asmara Putra",
    company: "Kementerian Kesehatan RI",
    role: "Health AI Data Scientist",
    avatar: "/alumni/alumni_4.jpg",
  },
  {
    name: "Haikal Shiddiq",
    company: "VMware by Broadcom",
    role: "Cloud AI Engineer",
    avatar: "/alumni/alumni_5.jpg",
  },
  {
    name: "R Adhiyaksa Indiharto",
    company: "Komisi Pemilihan Umum RI",
    role: "Data & Systems Specialist",
    avatar: "/alumni/alumni_6.jpg",
  },
];

export default function LearningPathPage() {
  // Master Track State: default to first group ("ai-engineer") as requested
  const [activeTrackId, setActiveTrackId] = useState<string>("ai-engineer");
  const [activeStageId, setActiveStageId] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<CourseStep | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // "Semua Kelas" Filters
  const [catalogCategory, setCatalogCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Subnav scroll ref
  const trackListRef = useRef<HTMLDivElement>(null);

  const scrollSubnav = (direction: "left" | "right") => {
    if (trackListRef.current) {
      const offset = direction === "left" ? -240 : 240;
      trackListRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Find currently active track
  const currentTrack =
    ALL_CURRICULUM_TRACKS.find((t) => t.id === activeTrackId) || ALL_CURRICULUM_TRACKS[0];

  // Stage filtering for active track detail
  const activeStage = currentTrack.stageGroups.find((g) => g.id === activeStageId);
  const filteredCourses =
    activeStageId === "all"
      ? currentTrack.courses
      : currentTrack.courses.filter((course) => {
          return activeStage ? activeStage.stepNumbers.includes(course.stepNumber) : true;
        });

  // Filtered tracks for "Semua Kelas"
  const catalogTracks = ALL_CURRICULUM_TRACKS.filter((t) => {
    const matchCategory = catalogCategory === "all" || t.category === catalogCategory;
    const matchSearch =
      searchQuery === "" ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleSelectTrack = (trackId: string) => {
    setActiveTrackId(trackId);
    setActiveStageId("all");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleSelectStage = (id: string) => {
    setActiveStageId(id);
    if (typeof window !== "undefined") {
      const el = document.getElementById("timeline-curriculum-flow");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="learning-path-wrapper">
      {/* Sticky Top Unified Header Stack: Menu + Breadcrumbs + Tab Group */}
      <div className="lp-sticky-header-stack">
        <SiteHeader activeTabOverride="learning-path" />

        {/* Breadcrumb Navigation Rail */}
        <div className="lp-breadcrumb-wrap">
        <BlackboxRails position="bottom" />
        <div className="blackbox-frame">
          <nav aria-label="Breadcrumb" className="lp-breadcrumb">
            <Link href="/" className="lp-breadcrumb-link">
              Beranda
            </Link>
            <span className="lp-breadcrumb-sep">/</span>
            <button
              type="button"
              onClick={() => handleSelectTrack("all-classes")}
              className="lp-breadcrumb-link"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", font: "inherit" }}
            >
              Learning Path
            </button>
            <span className="lp-breadcrumb-sep">/</span>
            <span className="lp-breadcrumb-current">
              {activeTrackId === "all-classes" ? "Semua Kurikulum & Kelas" : currentTrack.title}
            </span>
          </nav>
        </div>
      </div>

      {/* TOP CURRICULUM GROUPING SUBNAV (ANVIEO LEARNING-PATH-NAV COMPLIANT) */}
      <nav className="lp-subnav-bar" aria-label="Jalur Kurikulum Pembelajaran">
        <div className="blackbox-frame">
          <div className="lp-subnav-content">
            {/* Scrollable Curriculum Group Tracks */}
            <div className="lp-subnav-scroll-wrap">
              <button
                type="button"
                className="lp-subnav-scroll-btn"
                onClick={() => scrollSubnav("left")}
                aria-label="Scroll ke Kiri"
              >
                ‹
              </button>

              <div className="lp-subnav-track-list" ref={trackListRef}>
                {ALL_CURRICULUM_TRACKS.map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    className={`lp-subnav-item ${activeTrackId === track.id ? "active" : ""}`}
                    onClick={() => handleSelectTrack(track.id)}
                  >
                    <span>{track.title}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="lp-subnav-scroll-btn"
                onClick={() => scrollSubnav("right")}
                aria-label="Scroll ke Kanan"
              >
                ›
              </button>
            </div>

            {/* Separator Divider */}
            <div className="lp-subnav-divider" aria-hidden="true" />

            {/* Fixed Right-Corner "Semua Kelas" Button */}
            <button
              type="button"
              className={`lp-subnav-all-btn ${activeTrackId === "all-classes" ? "active" : ""}`}
              onClick={() => handleSelectTrack("all-classes")}
              title="Lihat seluruh daftar kurikulum & rincian harga per kotak"
            >
              <FlatIcon type="card" size={14} />
              <span>Semua Kelas</span>
            </button>
          </div>
        </div>
        <BlackboxRails position="bottom" />
      </nav>
    </div>

      {/* ====================================================================
          VIEW A: DETAIL ALUR KURIKULUM (KETIKA BUKAN "SEMUA KELAS")
          ==================================================================== */}
      {activeTrackId !== "all-classes" && (
        <>
          {/* Hero Section */}
          <section className="learning-path-hero blackbox-compute-band" style={{ position: "relative" }}>
            <BlackboxRails position="both" />
            <div className="blackbox-frame">
              <div className="learning-path-hero__content">
                <div className="lp-hero-badge-wrap">
                  <span className="lp-hero-badge">
                    JALUR BELAJAR RESMI STANDAR INDUSTRI // {currentTrack.categoryLabel.toUpperCase()}
                  </span>
                </div>

                <h1 className="learning-path-hero__title">{currentTrack.title}</h1>

                <p className="learning-path-hero__summary">{currentTrack.summary}</p>

                {/* Path Meta Summary Chips */}
                <div className="lp-stats-row">
                  <div className="lp-stat-box">
                    <span className="lp-stat-num">{currentTrack.totalHours}</span>
                    <span className="lp-stat-lbl">Jam Belajar</span>
                  </div>
                  <div className="lp-stat-sep" />
                  <div className="lp-stat-box">
                    <span className="lp-stat-num">{currentTrack.courseCount}</span>
                    <span className="lp-stat-lbl">Langkah Kurikulum</span>
                  </div>
                  <div className="lp-stat-sep" />
                  <div className="lp-stat-box">
                    <span className="lp-stat-num" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      {currentTrack.rating} <FlatIcon type="star" size={14} color="#EAB308" />
                    </span>
                    <span className="lp-stat-lbl">Rating Kurikulum</span>
                  </div>
                  <div className="lp-stat-sep" />
                  <div className="lp-stat-box">
                    <span className="lp-stat-num">{currentTrack.studentsCount}</span>
                    <span className="lp-stat-lbl">Siswa Terdaftar</span>
                  </div>
                </div>

                {/* Hero CTAs */}
                <div className="lp-hero-cta-group">
                  <Link href="/subscriptions/purchases" className="lp-btn-primary">
                    <span>Mulai Belajar Sekarang</span>
                    <FlatIcon type="arrow-right" size={15} color="#0A2E52" />
                  </Link>
                  <button type="button" onClick={handleShare} className="lp-btn-outline">
                    {copiedLink ? (
                      <>
                        <FlatIcon type="check" size={15} color="var(--gold)" />
                        <span>Link Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <FlatIcon type="share" size={15} color="currentColor" />
                        <span>Bagikan Alur Belajar</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectTrack("all-classes")}
                    className="lp-btn-outline"
                    style={{ borderColor: "var(--bx-border)" }}
                  >
                    <span>Lihat Semua Kelas &amp; Harga →</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Connected Vertical Timeline Courses Section */}
          <section className="learning-path-courses-section blackbox-compute-band" style={{ position: "relative" }}>
            <BlackboxRails position="top" />
            <BlackboxRails position="bottom" />
            <div className="blackbox-frame">
              <div className="blackbox-strip">
                <span className="blackbox-strip-label">01 // CURRICULUM SYLLABUS &amp; TIMELINE</span>
                <dl className="blackbox-strip-facts">
                  <div>
                    <dt>TOTAL STEPS</dt>
                    <dd>{currentTrack.courseCount} COURSES</dd>
                  </div>
                  <div>
                    <dt>DURATION</dt>
                    <dd>{currentTrack.totalHours} BELAJAR</dd>
                  </div>
                  <div>
                    <dt>STANDARDS</dt>
                    <dd>IEEE / NIST COMPLIANT</dd>
                  </div>
                </dl>
              </div>

              <div className="lp-section-header">
                <h2 className="lp-section-title">Urutan Langkah &amp; Tahapan Pembelajaran: {currentTrack.title}</h2>
                <p className="lp-section-subtitle">
                  Kurikulum terbagi menjadi tahapan berjenjang standar industri. Klik tahapan grouping di bawah untuk
                  meninjau rincian langkah belajar secara terfokus.
                </p>
              </div>

              {/* Interactive Stage Grouping Controls at Top */}
              <div className="lp-grouping-container" id="timeline-curriculum-flow">
                {/* Pill Navigation Bar */}
                <div className="lp-grouping-tabs-wrap">
                  <div className="lp-grouping-tabs">
                    <button
                      type="button"
                      className={`lp-grouping-tab ${activeStageId === "all" ? "active" : ""}`}
                      onClick={() => handleSelectStage("all")}
                    >
                      <span>Semua Tahap</span>
                      <span className="lp-grouping-tab-badge">
                        {currentTrack.courseCount} Kelas · {currentTrack.totalHours}
                      </span>
                    </button>

                    {currentTrack.stageGroups.map((group) => (
                      <button
                        key={group.id}
                        type="button"
                        className={`lp-grouping-tab ${activeStageId === group.id ? "active" : ""}`}
                        onClick={() => handleSelectStage(group.id)}
                      >
                        <span>
                          Tahap {group.stageNumber}: {group.title}
                        </span>
                        <span className="lp-grouping-tab-badge">{group.courseCount} Kelas</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stage Cards Grid */}
                <div
                  className="lp-stage-cards-grid"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(currentTrack.stageGroups.length, 4)}, 1fr)`,
                  }}
                >
                  {currentTrack.stageGroups.map((group) => {
                    const isSelected = activeStageId === group.id;
                    return (
                      <div
                        key={group.id}
                        className={`lp-stage-card ${isSelected ? "active" : ""}`}
                        onClick={() => handleSelectStage(isSelected ? "all" : group.id)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="lp-stage-card-top">
                          <span className="lp-stage-badge">TAHAP {group.stageNumber}</span>
                          <span className="lp-stage-steps">{group.stepRange}</span>
                        </div>
                        <h4 className="lp-stage-title">{group.title}</h4>
                        <p className="lp-stage-desc">{group.description}</p>
                        <div className="lp-stage-footer">
                          <span className="lp-stage-meta">{group.totalHours}</span>
                          <span className="lp-stage-dot">•</span>
                          <span className="lp-stage-meta">{group.totalModules}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Vertical Connected Timeline Flow */}
              <div className="lp-timeline-container">
                <div className="lp-timeline-spine" aria-hidden="true" />

                {filteredCourses.map((course, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <div
                      key={course.stepNumber}
                      className={`lp-timeline-row ${isLeft ? "row-left" : "row-right"}`}
                    >
                      {/* Course Card Column */}
                      <div className="lp-timeline-card-col">
                        <div
                          className="lp-course-card"
                          onClick={() => setSelectedCourse(course)}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="lp-card-header">
                            <span className="lp-card-step-tag">LANGKAH {course.stepNumber}</span>
                            <span className="lp-card-level-tag">{course.level}</span>
                          </div>

                          <h3 className="lp-card-title">{course.courseName}</h3>

                          <div className="lp-card-meta-row">
                            <span className="lp-card-meta-item">
                              <FlatIcon type="time" size={13} />
                              {course.duration}
                            </span>
                            <span className="lp-card-meta-item">
                              <FlatIcon type="star" size={13} color="#EAB308" />
                              {course.rating}
                            </span>
                            <span className="lp-card-meta-item">
                              <FlatIcon type="book" size={13} />
                              {course.modules}
                            </span>
                          </div>

                          <p className="lp-card-description">{course.description}</p>

                          <div className="lp-card-highlights">
                            <div className="lp-highlights-label">Silabus Kompetensi Kunci:</div>
                            <ul className="lp-highlights-list">
                              {course.highlights.slice(0, 3).map((hl, i) => (
                                <li key={i}>{hl}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="lp-card-footer">
                            <span className="lp-card-students">{course.students}</span>
                            <Link
                              href={course.courseSlug === "belajar-dasar-ai" ? "/academies/653-belajar-dasar-ai" : "/academies/653-belajar-dasar-ai"}
                              className="lp-card-detail-cta"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Lihat Silabus Lengkap →
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Center Node */}
                      <div className="lp-timeline-node-col" aria-hidden="true">
                        <div className="lp-timeline-node">
                          <span className="lp-timeline-node-inner">{course.stepNumber}</span>
                        </div>
                      </div>

                      {/* Side Step Description Column */}
                      <div className="lp-timeline-desc-col">
                        <div className="lp-side-desc-box">
                          <span className="lp-side-step-num">LANGKAH KE-{course.stepNumber}</span>
                          <h4 className="lp-side-step-title">{course.stepTitle}</h4>
                          <p className="lp-side-step-text">{course.stepDesc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 02: VERIFIED ALUMNI IMPACT */}
          <section className="lp-alumni-section blackbox-compute-band" style={{ position: "relative" }}>
            <BlackboxRails position="top" />
            <BlackboxRails position="bottom" />
            <div className="blackbox-frame">
              <div className="blackbox-strip">
                <span className="blackbox-strip-label">02 // VERIFIED ALUMNI OUTCOMES</span>
                <dl className="blackbox-strip-facts">
                  <div>
                    <dt>TOTAL ALUMNI</dt>
                    <dd>18.400+ PLACED</dd>
                  </div>
                  <div>
                    <dt>HIRING RATE</dt>
                    <dd>94.2% IN 90 DAYS</dd>
                  </div>
                </dl>
              </div>

              <div className="lp-section-header">
                <h2 className="lp-section-title">Lulusan &amp; Praktisi {currentTrack.title}</h2>
                <p className="lp-section-subtitle">
                  Ratusan ribu talenta telah menyelesaikan kurikulum ini dan kini berkarir di berbagai perusahaan
                  teknologi terkemuka di Asia Tenggara.
                </p>
              </div>

              <div className="lp-alumni-grid">
                {ALUMNI_DATA.map((alumni, idx) => (
                  <div key={idx} className="lp-alumni-card">
                    <div className="lp-alumni-avatar-wrap">
                      <img src={alumni.avatar} alt={alumni.name} className="lp-alumni-avatar" />
                    </div>
                    <div className="lp-alumni-info">
                      <h4 className="lp-alumni-name">{alumni.name}</h4>
                      <p className="lp-alumni-role">{alumni.role}</p>
                      <span className="lp-alumni-company">{alumni.company}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 03: FAQ */}
          <section className="lp-faq-section blackbox-compute-band" style={{ position: "relative" }}>
            <BlackboxRails position="top" />
            <BlackboxRails position="bottom" />
            <div className="blackbox-frame">
              <div className="blackbox-strip">
                <span className="blackbox-strip-label">03 // FREQUENTLY ASKED QUESTIONS</span>
                <dl className="blackbox-strip-facts">
                  <div>
                    <dt>ACCURACY</dt>
                    <dd>100% UP-TO-DATE</dd>
                  </div>
                </dl>
              </div>

              <div className="lp-section-header">
                <h2 className="lp-section-title">Pertanyaan Seputar Jalur {currentTrack.title}</h2>
              </div>

              <div className="lp-faq-grid">
                <div className="lp-faq-card">
                  <h4 className="lp-faq-q">Apakah saya harus menyelesaikan langkah secara berurutan?</h4>
                  <p className="lp-faq-a">
                    Sangat disarankan. Setiap modul dirancang berjenjang dengan konsep prerequisite agar pemahaman Anda
                    terbangun kuat dari fondasi hingga proyek tingkat lanjut.
                  </p>
                </div>
                <div className="lp-faq-card">
                  <h4 className="lp-faq-q">Apakah sertifikat kelulusan diakui secara internasional?</h4>
                  <p className="lp-faq-a">
                    Ya. Sertifikat kelulusan ANVIEO Academy diverifikasi secara kriptografis SHA-256 dan terakreditasi
                    sesuai standar IEEE, NIST AI RMF, dan CFA Institute.
                  </p>
                </div>
                <div className="lp-faq-card">
                  <h4 className="lp-faq-q">Bagaimana jika saya mengalami kendala pada saat mengerjakan tugas?</h4>
                  <p className="lp-faq-a">
                    Tersedia forum diskusi kelas interaktif dan tim reviewer profesional yang siap memberikan evaluasi
                    baris demi baris pada kode tugas submission Anda.
                  </p>
                </div>
                <div className="lp-faq-card">
                  <h4 className="lp-faq-q">Bagaimana cara mendapatkan harga paket kurikulum terbaik?</h4>
                  <p className="lp-faq-a">
                    Anda dapat membeli kurikulum ini secara langsung untuk akses seumur hidup, atau menggunakan paket
                    langganan fleksibel mulai dari Rp 250.000 / bulan untuk akses ke semua 14 kurikulum.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ====================================================================
          VIEW B: KATALOG SEMUA KELAS & HARGA PER KURIKULUM KOTAK
          ==================================================================== */}
      {activeTrackId === "all-classes" && (
        <section style={{ padding: "40px 0 80px", background: "var(--bx-bg)", position: "relative" }}>
          <BlackboxRails position="both" />
          <div className="blackbox-frame">
            {/* Header Strip */}
            <div className="blackbox-strip">
              <span className="blackbox-strip-label">01 // ALL ACCREDITED CURRICULUMS &amp; PRICING</span>
              <dl className="blackbox-strip-facts">
                <div>
                  <dt>TOTAL TRACKS</dt>
                  <dd>14 ALUR KURIKULUM</dd>
                </div>
                <div>
                  <dt>TOTAL HOURS</dt>
                  <dd>2.800+ JAM</dd>
                </div>
                <div>
                  <dt>MODEL</dt>
                  <dd>BELI SATUAN ATAU LANGGANAN</dd>
                </div>
              </dl>
            </div>

            {/* Page Header */}
            <div style={{ maxWidth: "880px", marginBottom: "32px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 10px",
                  border: "1px solid var(--gold)",
                  borderRadius: "2px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--gold)",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                }}
              >
                KATALOG LENGKAP SEMUA KELAS ANVIEO ACADEMY
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.85rem, 3.2vw, 2.75rem)",
                  fontWeight: 800,
                  color: "var(--bx-ink-bright)",
                  lineHeight: 1.2,
                  marginBottom: "14px",
                }}
              >
                Daftar Lengkap Alur Kurikulum &amp; Harga per Program
              </h1>
              <p style={{ color: "var(--bx-ink-soft)", fontSize: "1rem", lineHeight: 1.6, margin: 0 }}>
                Pilih jalur belajar sesuai spesialisasi karier Anda. Setiap kurikulum dapat dibeli secara satuan untuk{" "}
                <strong>Akses Seumur Hidup</strong> atau diakses tanpa batas melalui{" "}
                <strong>Paket Berlangganan</strong>.
              </p>
            </div>

            {/* Filter and Search Controls */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                padding: "16px 20px",
                background: "var(--bx-surface)",
                border: "1px solid var(--bx-border)",
                borderRadius: "var(--radius-xs)",
                marginBottom: "32px",
              }}
            >
              {/* Category Pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[
                  { id: "all", label: "Semua Kategori" },
                  { id: "ai", label: "AI & Data Science" },
                  { id: "web", label: "Web & Backend" },
                  { id: "mobile", label: "Mobile Apps" },
                  { id: "cloud", label: "Cloud & DevOps" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCatalogCategory(cat.id)}
                    style={{
                      background: catalogCategory === cat.id ? "var(--bx-ink-bright)" : "transparent",
                      color: catalogCategory === cat.id ? "var(--bx-bg)" : "var(--bx-ink-bright)",
                      border: "1px solid var(--bx-border)",
                      padding: "6px 14px",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      borderRadius: "2px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div style={{ position: "relative", minWidth: "240px" }}>
                <input
                  type="text"
                  placeholder="Cari kurikulum atau teknologi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    background: "var(--bx-bg)",
                    border: "1px solid var(--bx-border)",
                    color: "var(--bx-ink-bright)",
                    fontSize: "0.8125rem",
                    borderRadius: "2px",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Grid of Curriculum Box Cards */}
            <div className="all-classes-grid">
              {catalogTracks.map((track) => (
                <div key={track.id} className="curriculum-box-card">
                  <div>
                    {/* Top Category Badge */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--gold)",
                        }}
                      >
                        {track.categoryLabel}
                      </span>
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          padding: "2px 6px",
                          border: "1px solid var(--bx-border)",
                          borderRadius: "2px",
                          color: "var(--bx-ink-faint)",
                        }}
                      >
                        {track.levelRange}
                      </span>
                    </div>

                    {/* Track Title */}
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.375rem",
                        fontWeight: 700,
                        color: "var(--bx-ink-bright)",
                        margin: "0 0 10px",
                        lineHeight: 1.25,
                      }}
                    >
                      {track.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--bx-ink-soft)",
                        lineHeight: 1.6,
                        marginBottom: "18px",
                      }}
                    >
                      {track.summary}
                    </p>

                    {/* Specifications Grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px",
                        padding: "12px",
                        background: "var(--bx-bg)",
                        border: "1px solid var(--bx-border)",
                        borderRadius: "2px",
                        fontSize: "0.75rem",
                      }}
                    >
                      <div>
                        <span style={{ color: "var(--bx-ink-faint)", display: "block" }}>Durasi Belajar:</span>
                        <strong style={{ color: "var(--bx-ink-bright)" }}>{track.totalHours}</strong>
                      </div>
                      <div>
                        <span style={{ color: "var(--bx-ink-faint)", display: "block" }}>Langkah &amp; Modul:</span>
                        <strong style={{ color: "var(--bx-ink-bright)" }}>
                          {track.courseCount} Kelas ({track.totalModules})
                        </strong>
                      </div>
                      <div>
                        <span style={{ color: "var(--bx-ink-faint)", display: "block" }}>Rating Kurikulum:</span>
                        <strong style={{ color: "var(--gold)" }}>★ {track.rating} / 5.0</strong>
                      </div>
                      <div>
                        <span style={{ color: "var(--bx-ink-faint)", display: "block" }}>Siswa Terdaftar:</span>
                        <strong style={{ color: "var(--bx-ink-bright)" }}>{track.studentsCount}</strong>
                      </div>
                    </div>

                    {/* Pricing Box per Curriculum */}
                    <div className="curriculum-price-box">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          marginBottom: "4px",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontSize: "0.6875rem",
                              color: "var(--bx-ink-faint)",
                              textTransform: "uppercase",
                              display: "block",
                            }}
                          >
                            Beli Kurikulum Penuh (Akses Selamanya):
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-heading)",
                              fontSize: "1.375rem",
                              fontWeight: 800,
                              color: "var(--gold)",
                            }}
                          >
                            {track.priceLifetime}
                          </span>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span
                            style={{
                              fontSize: "0.75rem",
                              textDecoration: "line-through",
                              color: "var(--bx-ink-faint)",
                              display: "block",
                            }}
                          >
                            {track.priceNormal}
                          </span>
                          <span
                            style={{
                              fontSize: "0.6875rem",
                              color: "#22c55e",
                              fontWeight: 700,
                            }}
                          >
                            HEMAT {track.discountPercent}
                          </span>
                        </div>
                      </div>

                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--bx-ink-faint)",
                          borderTop: "1px dashed var(--bx-border)",
                          paddingTop: "6px",
                          marginTop: "6px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>Atau Berlangganan:</span>
                        <strong style={{ color: "var(--bx-ink-bright)" }}>Mulai {track.priceMonthly}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Dual Action CTAs */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
                    <button
                      type="button"
                      onClick={() => handleSelectTrack(track.id)}
                      className="blackbox-pill blackbox-pill-gold"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      LIHAT ALUR KURIKULUM →
                    </button>
                    <Link
                      href="/subscriptions/purchases"
                      className="blackbox-pill blackbox-pill-black"
                      style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
                    >
                      Beli / Mulai Langganan
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {catalogTracks.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <p style={{ color: "var(--bx-ink-faint)", fontSize: "1rem" }}>
                  Tidak ada kurikulum yang sesuai dengan pencarian &quot;{searchQuery}&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setCatalogCategory("all");
                  }}
                  className="blackbox-pill blackbox-pill-gold"
                  style={{ marginTop: "12px" }}
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* DETAIL MODAL FOR STEP COURSES */}
      {selectedCourse && (
        <div className="lp-modal-backdrop" onClick={() => setSelectedCourse(null)}>
          <div className="lp-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lp-modal-close"
              onClick={() => setSelectedCourse(null)}
              aria-label="Tutup Detail"
            >
              ×
            </button>

            <div className="lp-modal-header">
              <span className="lp-modal-step-tag">LANGKAH {selectedCourse.stepNumber} // {selectedCourse.level}</span>
              <h3 className="lp-modal-title">{selectedCourse.courseName}</h3>
              <p className="lp-modal-subtitle">{selectedCourse.stepDesc}</p>
            </div>

            <div className="lp-modal-meta-grid">
              <div className="lp-modal-meta-item">
                <span className="lp-meta-label">DURASI BELAJAR</span>
                <span className="lp-meta-val">{selectedCourse.duration}</span>
              </div>
              <div className="lp-modal-meta-item">
                <span className="lp-meta-label">RATING KELAS</span>
                <span className="lp-meta-val">★ {selectedCourse.rating} / 5.0</span>
              </div>
              <div className="lp-modal-meta-item">
                <span className="lp-meta-label">TOTAL MATERI</span>
                <span className="lp-meta-val">{selectedCourse.modules}</span>
              </div>
              <div className="lp-modal-meta-item">
                <span className="lp-meta-label">PENDAFTAR</span>
                <span className="lp-meta-val">{selectedCourse.students}</span>
              </div>
            </div>

            <div className="lp-modal-body">
              <h4 className="lp-modal-sec-title">Deskripsi Lengkap Modul</h4>
              <p className="lp-modal-text">{selectedCourse.description}</p>

              <h4 className="lp-modal-sec-title" style={{ marginTop: "20px" }}>
                Kompetensi Silabus yang Dipelajari:
              </h4>
              <ul className="lp-modal-list">
                {selectedCourse.highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="lp-modal-footer" style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "flex-end" }}>
              <Link
                href="/academies/653-belajar-dasar-ai"
                className="lp-btn-outline"
                style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
                onClick={() => setSelectedCourse(null)}
              >
                <span>Buka Silabus Lengkap (39 Modul) →</span>
              </Link>
              <Link
                href="/subscriptions/single-course-653/checkout"
                className="lp-btn-primary"
                onClick={() => setSelectedCourse(null)}
              >
                <span>Berlangganan Sekarang (Rp500rb) →</span>
                <FlatIcon type="arrow-right" size={15} color="#0A2E52" />
              </Link>
              <button
                type="button"
                className="lp-btn-outline"
                onClick={() => setSelectedCourse(null)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
