const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema (

{

fullName: { type: String, required: true },

email: { type: String, required: true, unique: true },

password: { type: String, required: true },

profileImageUrl: { type: String, default: null},

},

{ timestamps: true }
);

// Hash password before saving

UserSchema.pre("save", async function (next) {
// #region agent log
if (typeof fetch !== 'undefined') fetch('http://127.0.0.1:7242/ingest/204d0656-564e-481d-90e6-604137bf5d03',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'User.js:24',message:'pre-save hook entry',data:{hasNext:typeof next==='function',isModified:this.isModified('password')},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix'})}).catch(()=>{});
// #endregion
  // Skip if password hasn't been modified
  if (!this.isModified("password")) {
// #region agent log
if (typeof fetch !== 'undefined') fetch('http://127.0.0.1:7242/ingest/204d0656-564e-481d-90e6-604137bf5d03',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'User.js:28',message:'password not modified, skipping',data:{hasNext:typeof next==='function'},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix'})}).catch(()=>{});
// #endregion
    // Call next if available (for non-async contexts), otherwise just return
    return typeof next === 'function' ? next() : undefined;
  }

  try {
    // Hash the password
    this.password = await bcrypt.hash(this.password, 10);
// #region agent log
if (typeof fetch !== 'undefined') fetch('http://127.0.0.1:7242/ingest/204d0656-564e-481d-90e6-604137bf5d03',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'User.js:36',message:'password hashed, before next',data:{hasNext:typeof next==='function'},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix'})}).catch(()=>{});
// #endregion
    // Call next if available, otherwise the async function will handle completion
    if (typeof next === 'function') {
      next();
    }
  } catch (error) {
// #region agent log
if (typeof fetch !== 'undefined') fetch('http://127.0.0.1:7242/ingest/204d0656-564e-481d-90e6-604137bf5d03',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'User.js:43',message:'pre-save hook error',data:{error:error.message,hasNext:typeof next==='function'},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix'})}).catch(()=>{});
// #endregion
    // Pass error to next if available, otherwise throw
    if (typeof next === 'function') {
      next(error);
    } else {
      throw error;
    }
  }
});

// Compare passwords

UserSchema.methods.comparePassword = async function (candidatePassword) {

return await bcrypt.compare(candidatePassword, this.password);
};

module.exports=mongoose.model("User",UserSchema);