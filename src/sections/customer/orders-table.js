import PropTypes from "prop-types";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { useToasts } from "react-toast-notifications";
// import { routeControler } from "src/utils/role-controler";
import { useEffect } from "react";
import {
  Box,
  Card,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,

} from "@mui/material";
import useFetcher from "src/hooks/use-fetcher";
import DeleteModal from "src/components/Modals/DeleteModal";
import EditCompanyModal from "src/components/Modals/EditModal/EditOrder-modal";
import EditProductModal from "src/components/Modals/EditModal/EditProduct-modal";
import EditBotProductModal from "src/components/Modals/EditModal/EditBotProduct-modal";
import EditMobileProductModal from "src/components/Modals/EditModal/EditMobileProduct-modal";
import { Scrollbar } from "src/components/scrollbar";
import Content from "src/Localization/Content";
import { useSelector } from "react-redux";

export const CustomersTable = (props) => {
  const {
    count = 0,
    type,
    items = [],
    setCategoryId = () => {},
    categoryData = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    getDate,
  } = props;
  const { createData, fetchData, data } = useFetcher();

  const { lang } = useSelector((state) => state.localiztion);

  const { localization } = Content[lang];
  const BaseUrl = process.env.NEXT_PUBLIC_ANALYTICS_BASEURL;

  const router = usePathname();
  const {addToast} = useToasts();
  const user = JSON.parse(window.sessionStorage.getItem("user")) || false;

  // const checkAccess = routeControler[user.role]?.edit?.find((item) => item == router);


console.log(items);

  const changeIsExist = async (id, value) => {
      try {

        const formData = new FormData();
       
        formData.append("exist", value);
    


        const response = await fetch(BaseUrl + `/mobile/product/${id}`, {
          method: 'PATCH',

          headers: {
            Authorization: JSON.parse(window.sessionStorage.getItem("authenticated")) || false,
            lang: lang,
          },
          body: formData,
        });

        const res = await response.json()

        if (res.success) {

          getDate()
        }

        addToast(res.message, {
          appearance: res.success ? "success" : "error",
          autoDismiss: true,
        });

      } catch (err) {
console.log(err.message);
      }
    
}

  

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              {type === "order" ? (
                <TableRow>
                  <TableCell>{localization.table.image}</TableCell>
                  <TableCell>{localization.table.name}</TableCell>
                  <TableCell>{localization.table.titile}</TableCell>
                  <TableCell>{localization.table.sale_amount}</TableCell>
                  <TableCell>{localization.table.info}</TableCell>
                  <TableCell>{localization.table.created_at}</TableCell>
                  <TableCell>{localization.action}</TableCell>
                </TableRow>
              ) : type === "botproducts" ? (
                <TableRow>
                  <TableCell>{localization.table.image}</TableCell>
                  <TableCell>{localization.table.name + " " + localization.uz}</TableCell>
                  <TableCell> {localization.table.name + " " + localization.ru}</TableCell>
                  <TableCell> {localization.table.name + " " + localization.en}</TableCell>
                  <TableCell> {localization.table.info + " " + localization.uz}</TableCell>
                  <TableCell> {localization.table.info + " " + localization.ru}</TableCell>
                  <TableCell> {localization.table.info + " " + localization.en}</TableCell>
                  <TableCell>{localization.table.new_price}</TableCell>
                  <TableCell>{localization.table.created_at}</TableCell>
                  <TableCell>{localization.action}</TableCell>
                </TableRow>
              ) : type === "mobileproduct" ? (
                <TableRow>
                  <TableCell>{localization.table.image}</TableCell>
                  <TableCell>{localization.table.name}</TableCell>
                  <TableCell> {localization.table.titile}</TableCell>
                  <TableCell> {localization.table.subtitle}</TableCell>
                  <TableCell>{localization.table.new_price}</TableCell>
                  <TableCell> {localization.table.sale_cost}</TableCell>
                  <TableCell> {localization.table.sale_amount}</TableCell>
                  <TableCell>{localization.table.created_at}</TableCell>
                  <TableCell>{localization.action}</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell>
                    {localization.table.truck_number + " " + localization.table.image}
                  </TableCell>
                  <TableCell>{localization.table.image}</TableCell>
                  <TableCell>{localization.table.name}</TableCell>
                  <TableCell>{localization.table.info}</TableCell>
                  <TableCell>
                    {localization.table.seria_id + " " + localization.table.image + " 1"}
                  </TableCell>
                  <TableCell>
                    {localization.table.seria_id + " " + localization.table.name + " 1"}
                  </TableCell>
                  <TableCell>
                    {localization.table.seria_id + " " + localization.table.info + " 1"}
                  </TableCell>
                  <TableCell>
                    {localization.table.seria_id + " " + localization.table.image + " 2"}
                  </TableCell>
                  <TableCell>
                    {localization.table.seria_id + " " + localization.table.name + " 2"}
                  </TableCell>
                  <TableCell>
                    {localization.table.seria_id + " " + localization.table.info + " 2"}
                  </TableCell>

                  <TableCell>{localization.table.created_at}</TableCell>
                  <TableCell>{localization.action}</TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const createdAt = format(customer?.created_at, "dd/MM/yyyy");
                const customAt = format(
                  new Date(customer?.custom_date ? customer?.custom_date : null)?.getTime(),
                  "dd/MM/yyyy HH:mm"
                );
                if (type === "order") {
                  return (
                    <TableRow hover key={customer?._id}>
                      <TableCell>
                        <img
                          src={BaseUrl + "/file/reviews/" + customer.image}
                          alt="img"
                          width={60}
                          height={60}
                        />
                      </TableCell>
                      <TableCell>{customer?.name}</TableCell>
                      <TableCell>{customer?.title}</TableCell>
                      <TableCell>{customer?.stars}</TableCell>
                      <TableCell>{customer?.info}</TableCell>
                      <TableCell>{createdAt}</TableCell>
                      {/* {!!checkAccess && ( */}
                      <TableCell>
                        <EditCompanyModal row={customer} route={`review`} getDatas={getDate} />
                        <DeleteModal route={`review/${customer?._id}`} getDatas={getDate} />
                      </TableCell>
                      {/* )} */}
                    </TableRow>
                  );
                } else if (type === "mobileproduct") {
                  return (
                    <TableRow hover key={customer?._id}>
                      <TableCell>
                        <img
                          src={BaseUrl + "/file/mobileProducts/" + customer.image}
                          alt="img"
                          width={60}
                          height={60}
                        />
                      </TableCell>
                      <TableCell>{customer?.[`name${lang}`]}</TableCell>
                      <TableCell>{customer?.[`title${lang}`]}</TableCell>
                      <TableCell>{customer?.[`sub_title${lang}`]}</TableCell>
                      <TableCell>{customer?.cost}</TableCell>
                      <TableCell>{customer.sale && customer?.sale_cost}</TableCell>
                      <TableCell>{customer.sale && customer?.sale_amount + "%"}</TableCell>
                      <TableCell>{createdAt}</TableCell>

                      <TableCell>
                        <EditMobileProductModal
                          row={customer}
                          route={`mobile/product`}
                          getDatas={getDate}
                          data={categoryData}
                          setCategoryId={setCategoryId}
                        />
                        <DeleteModal route={`mobile/product/${customer?._id}`} getDatas={getDate} />
                        <FormControlLabel
                          value="top"
                          control={
                            <Switch
                              checked={customer?.exist}
                              onChange={(value) => {
                                changeIsExist(customer._id, value.target.checked);
                              }}
                              color="warning"
                            />
                          }
                          label={localization.table.exist}
                          labelPlacement="bottom"
                        />
                      </TableCell>
                    </TableRow>
                  );
                } else if (type === "botproducts") {
                  return (
                    <TableRow hover key={customer?._id}>
                      <TableCell>
                        <img
                          src={BaseUrl + "/file/botProducts/" + customer.image}
                          alt="img"
                          width={60}
                          height={60}
                        />
                      </TableCell>
                      <TableCell>{customer?.nameuz}</TableCell>
                      <TableCell>{customer?.nameru}</TableCell>
                      <TableCell>{customer?.nameen}</TableCell>
                      <TableCell>{customer?.infouz}</TableCell>
                      <TableCell>{customer?.inforu}</TableCell>
                      <TableCell>{customer?.infoen}</TableCell>
                      <TableCell>{customer?.cost}</TableCell>
                      <TableCell>{createdAt}</TableCell>

                      <TableCell>
                        <EditBotProductModal
                          row={customer}
                          data={data}
                          route={`botproduct`}
                          getDatas={getDate}
                        />
                        <DeleteModal route={`botproduct/${customer?._id}`} getDatas={getDate} />
                      </TableCell>
                    </TableRow>
                  );
                }
                return (
                  <TableRow hover key={customer._id}>
                    <TableCell>
                      <img
                        src={BaseUrl + "/file/brands/" + customer.main_image}
                        alt="img"
                        width={60}
                        height={60}
                      />
                    </TableCell>
                    <TableCell>
                      <img
                        src={BaseUrl + "/file/brands/" + customer.inner_image}
                        alt="img"
                        width={60}
                        height={60}
                      />
                    </TableCell>
                    <TableCell>{customer?.[`name${lang || "uz"}`]}</TableCell>
                    <TableCell>{customer?.[`info${lang || "uz"}`]}</TableCell>

                    <TableCell
                      sx={{ backgroundColor: customer.box_color1, color: customer.text_color1 }}
                    >
                      <img
                        src={BaseUrl + "/file/brands/" + customer.inner_image1}
                        alt="img"
                        width={60}
                        height={60}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: customer.box_color1, color: customer.text_color1 }}
                    >
                      {customer?.[`title1${lang || "uz"}`]}
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: customer.box_color1, color: customer.text_color1 }}
                    >
                      {customer?.[`info1${lang || "uz"}`]}
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: customer.box_color2, color: customer.text_color2 }}
                    >
                      <img
                        src={BaseUrl + "/file/brands/" + customer.inner_image2}
                        alt="img"
                        width={60}
                        height={60}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: customer.box_color2, color: customer.text_color2 }}
                    >
                      {customer?.[`title2${lang || "uz"}`]}
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: customer.box_color2, color: customer.text_color2 }}
                    >
                      {customer?.[`info2${lang || "uz"}`]}
                    </TableCell>
                    <TableCell>{createdAt}</TableCell>
                    {/* {!!checkAccess && ( */}
                    <TableCell>
                      <EditProductModal row={customer} route={`${type}`} getDatas={getDate} />
                      <DeleteModal route={`${type}/${customer._id}`} getDatas={getDate} />
                    </TableCell>
                    {/* )} */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        labelRowsPerPage={localization.table.rows_per_page}
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  type: PropTypes.string,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSubmit: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};


