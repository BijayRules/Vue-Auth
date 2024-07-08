<script setup></script>

<template>
  <div className="th-container">
    <div className="th-login">
      <div>
        <div className="th-login-form">
          <div className="th-card py-8 px-11 min-w-[500px]">
            <h1 className="th-heading text-center">
              <span className="uppercase block mb-2"> GWT Backend </span>
            </h1>

            <form className="mt-10">
              <div className="th-form-wrapper">
                <div className="th-form">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="Email"
                    value=""
                    autoComplete="off"
                    id="email"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="th-form">
                  <label htmlFor="password">Password</label>
                  <div className="relative">
                    <input
                      type="{passwordType}"
                      name="Password"
                      value=""
                      id="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="th-btn w-full mt-5 disabled:opacity-60">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
