import React from "react"
import styled from "styled-components"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .page-title {
    color: var(--primaryColor);
    font-weight: bold;
    font-size: 2rem;
    margin: 2rem;
  }

  .page-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20%;
    margin-bottom: 5rem;

    .paragraph-title {
      color: var(--primaryColor);
      font-weight: bold;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .paragraph-value {
    }

    .divider {
      width: 100%;
      margin: 2rem 0;
      border: none;
      border-top: 1px solid var(--primaryColor);
    }
  }
`

const ContactPage = () => {
  return (
    <Layout pageTitle="About">
      <Seo title="About" />
      <Container>
        <div className="page-title">About MRSDB</div>
        <div className="page-content">
          <div className="paragraph-title">Data Library</div>
          <div className="paragraph-value">
            The prototype version of MRSDB contains mock data generated from
            real clinical and research datasets to demonstrate the functionality
            of MRSDB. The real-life reference library is a unique collection of
            MRS studies across a multitude of subject matters that include
            traumatic brain injuries, brain tumors, psychiatric, and metabolic
            disorders, and includes over 2,000 brain samples using single-voxel
            spectroscopy and tens of thousands oftissue samples using
            spectroscopic imaging. Using these datasets, promising ML
            applications have been identified, such as modeling brain
            tissuecompositions from metabolic components, automation of data
            preprocessing and quantification of spectral signals, and modeling
            of behavioral andcognitive scores from brain metabolites in former
            football players.
          </div>
          <hr className="divider" />
          <div className="paragraph-title">Standardized Data Format</div>
          <div className="paragraph-value">
            One goal of this project is to extend the Brain Imaging Data
            Structure (BIDS) format to encompass MRS. Once achieved, allcurrent
            and future data acquired from different sites and systems will be
            harmonized and standardized using the BIDS format. This will allow
            theincorporation of BIDS-compatible multimodal data formats into the
            database. One example is MR imaging, such as structural imaging (T1,
            T2, FLAIR),diffusion-weighted imaging, and functional MRI, which are
            often acquired alongside MR spectroscopy. Furthermore, a universal
            data format willencourage users to contribute their own data to
            improve and scale the database, thereby enabling the development of
            more complex and robust MLmodels over time.
          </div>
          <hr className="divider" />
          <div className="paragraph-title">
            Data Processing, Spectral Quantification, and Brain Tissue Component
            Extraction
          </div>
          <div className="paragraph-value">
            A fully automated and cloud-based back-end service built using
            Django, a Python-based backend framework, will be implemented to
            quantify raw MRS data and obtain relative, pseudo-absolute, and
            absolute concentrations in mmol/L and mmol/Kg. This service will
            interface with the LCModel command-line API to compute these values
            usingspectroscopy data, corresponding water reference data, and
            anatomical volumes. In addition, volume fractions of gray matter,
            white matter, andc erebrospinal fluid in acquired voxel locations
            will be extracted from incorporated anatomical information (T1w,
            T2w, FLAIR) during the data processing pipeline. These components
            will be added to the database metadata, which will provide
            additional dimensions for analysis.
          </div>
          <hr className="divider" />
          <div className="paragraph-title">Web Architecture and Resources</div>
          <div className="paragraph-value">
            The user interface of the database will be a streamlined web
            application that will facilitate efficient browsing,uploading, and
            downloading of MRS data. This platform will be built using ReactJS,
            a modular and scalable modern web development frameworkthat will
            allow new features to be added iteratively to accommodate new sites
            and datasets. The data library will be stored in PostgreSQL, a
            secure andscalable open-source relational database. The Django
            back-end service will also handle communications between the
            database and user interface, whichwill be secured behind a
            user-authentication system to prevent unauthorized access of study
            data and PHI.
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default ContactPage
