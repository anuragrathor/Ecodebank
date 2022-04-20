<!-- Password Protected Modal Popup -->
<div class="modal" id="PasswordProtected" tabindex="-1" role="dialog">
	<div class="modal-dialog modal-dialog-centered password-protected-modal" role="document">
		<div class="modal-content radius5 border-0">
		  <div class="modal-body p15 p-md30 smart-form">
			<img class="img-responsive center-block hidden-xs" src="../images/password-modal-icon.png">
			   <div class="password-modal-heading">Password Protected</div>
			   <p class="password-modal-title">This video is password protected, Please enter<br> the valid password to view this video.</p>
				<label>Enter your password</label>
				<div class="error-message relative">
					<input class="form-control pr60" id="password-field" placeholder="Enter your password here" value="" type="password">
					<div class="form-control-icon-right">
					  <button class="btn addon-icon f-15 toggle-password" toggle="#password-field" type="button"><i class="toogle-icon icon-show f-16" aria-hidden="true"></i> </button>
					</div>
				</div>
				<small class="error-text">Please enter the correct value</small>
		  </div>
		  <div class="custom-modal-foooter text-center">
			<a href="javascript:void(0)" class="base-btn default-btn mr5" data-dismiss="modal">Cancel</a>
			<a href="#" class="base-btn blue-btn f-14">Submit</a>
		  </div>
		</div>
	</div>
</div>