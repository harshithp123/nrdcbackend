
import User  from "../models/user.js";
import Form from "../models/form.js";


// 🟢 Create a new form
export const createForm = async (req, res) => {
  try {
    const { user_id, form_data } = req.body;
    if (!user_id || !form_data)
      return res.status(400).json({ message: "Missing required fields ❌" });

    const user = await User.findByPk(user_id);
    if (!user)
      return res.status(404).json({ message: "User not found ❌" });

    const form = await Form.create({ user_id, form_data });

    res.status(200).json({
      status: 200,
      message: "Form created successfully ✅",
      form,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟡 Update form (form_data, status only)
export const updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { form_data, status } = req.body;

    const form = await Form.findByPk(id);
    if (!form || form.is_deleted)
      return res.status(404).json({ message: "Form not found ❌" });

    form.form_data = form_data || form.form_data;
    form.status = status || form.status;
    form.updated_at = new Date();

    await form.save();

    res.status(200).json({
      status: 200,
      message: "Form updated successfully ✅",
      form,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔴 Soft delete form
export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await Form.findByPk(id);
    if (!form || form.is_deleted)
      return res.status(404).json({ message: "Form not found ❌" });

    form.is_deleted = true;
    form.updated_at = new Date();
    await form.save();

    res.status(200).json({
      status: 200,
      message: "Form deleted (soft) successfully ✅",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟣 Get all forms (non-deleted)
export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.findAll({
      where: { is_deleted: false },
      include: [{ model: User, attributes: ["id", "name", "email"] }],
      order: [["updated_at", "DESC"]],
    });

    res.status(200).json({
      status: 200,
      message: "Forms fetched successfully ✅",
      total: forms.length,
      forms,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟤 Get single form by ID
export const getFormById = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await Form.findOne({
      where: { id, is_deleted: false },
      include: [{ model: User, attributes: ["id", "name", "email"] }],
    });

    if (!form)
      return res.status(404).json({ message: "Form not found ❌" });

    res.status(200).json({
      status: 200,
      message: "Form fetched successfully ✅",
      form,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
