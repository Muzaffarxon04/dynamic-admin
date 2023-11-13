import * as React from "react";
import { useEffect, useRef } from "react";
import { NumericFormatCustom } from "src/components/FormatedImput";
import Content from "src/Localization/Content";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@heroicons/react/24/solid/XMarkIcon";
import { SvgIcon, useMediaQuery } from "@mui/material";
import { useToasts } from "react-toast-notifications";
import useFetcher from "src/hooks/use-fetcher";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Stack, TextField, Typography, MenuItem } from "@mui/material";
const BaseUrl = process.env.NEXT_PUBLIC_ANALYTICS_BASEURL;


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }}
      {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon width={25} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


export default function AddReviewModal({ getDatas, company }) {
  const { lang } = useSelector((state) => state.localiztion);
  const matches = useMediaQuery("(min-width:500px)");

  const { localization } = Content[lang];
  const image = React.useRef("")
  
  const { fetchData, data, loading, error, createData } = useFetcher();
  const [open, setOpen] = React.useState(false);
  const {addToast} = useToasts()

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onFinish = () => {
    formik.values.nameuz = "";
    formik.values.short_infouz = "";
    formik.values.ingredientsuz = "";
    formik.values.long_infouz = "";
  };

  const formik = useFormik({
    initialValues: {
      nameuz: "",
      short_infouz: "",
      ingredientsuz: "",
      image: "",
      long_infouz: "",
      submit: null,
    },
    validationSchema: Yup.object({
      nameuz: Yup.string().min(2).required(" Name is required"),

    }),

    onSubmit: async (values, helpers) => {
      try {

        const formData = new FormData();
        image.current?.files[0] && formData.append('image', image.current?.files[0]);
        formData.append('name', values.nameuz);
        formData.append('title', values.short_infouz);
        formData.append('stars', values.ingredientsuz);
        formData.append('info', values.long_infouz);
      

        const response = await fetch(BaseUrl + "/review/create", {
          method: 'POST',

          headers: {
            Authorization: JSON.parse(window.sessionStorage.getItem("authenticated")) || false,
            lang: lang,
          },
          body: formData,
        });

        const res = await response.json()

        if (res.success) {

          getDatas()
          onFinish()
        }

        addToast(res.message, {
          appearance: res.success ? "success" : "error",
          autoDismiss: true,
        });

      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });




  return (
    <div>
      <Button
        onClick={handleClickOpen}
        startIcon={
          <SvgIcon fontSize="small">
            <PlusIcon />
          </SvgIcon>
        }
        variant="contained"
      >
        {localization.modal.add}
      </Button>
      <BootstrapDialog onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <BootstrapDialogTitle id="customized-dialog-title"
          onClose={handleClose}>
          {localization.modal.addProduct.addproduct}
        </BootstrapDialogTitle>
        <form noValidate
          onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <Stack spacing={3}
              width={matches ? 400 : null}>
              <TextField
                fullWidth
                name="image"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="file"
                inputRef={image}
              />

        

              <TextField

                error={!!(formik.touched.nameuz && formik.errors.nameuz)}
                fullWidth
                helperText={formik.touched.nameuz && formik.errors.nameuz}
                label={localization.table.name}
                name="nameuz"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.nameuz}
              />
       
              <TextField

                error={!!(formik.touched.short_infouz && formik.errors.short_infouz)}
                fullWidth
                helperText={formik.touched.short_infouz && formik.errors.short_infouz}
                label={localization.table.titile}
                name="short_infouz"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.short_infouz}
              />
   
              <TextField

                error={!!(formik.touched.long_infouz && formik.errors.long_infouz)}
                fullWidth
                helperText={formik.touched.long_infouz && formik.errors.long_infouz}
                label={localization.table.info}
                name="long_infouz"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.long_infouz}
              />
       
        
              <TextField
                error={!!(formik.touched.ingredientsuz && formik.errors.ingredientsuz)}
                fullWidth
                helperText={formik.touched.ingredientsuz && formik.errors.ingredientsuz}
                label={localization.table.sale_amount}

                name="ingredientsuz"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.ingredientsuz}
              />
            </Stack>

            {formik.errors.submit && (
              <Typography color="error"
                sx={{ mt: 3 }}
                variant="body2">
                {formik.errors.submit}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              fullWidth
              size="large"
              sx={{ my: 1 }}
              type="submit"
              variant="contained"
            >
              {localization.modal.add}
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}
